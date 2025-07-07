import { test, expect, describe, beforeEach } from "@playwright/test";
import { loginWith, createBlog } from "./helper.js";
import { createTestUser } from "./test-utils.js";

describe("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    await page.goto("/");
    await page.evaluate(() => localStorage.clear());
  });

  test("Login form is shown", async ({ page }) => {
    await expect(page.locator("div.card-title")).toHaveText("Log in");
    await expect(page.getByTestId("username")).toBeVisible();
    await expect(page.getByTestId("password")).toBeVisible();
    await expect(page.getByRole("button", { name: "Log in" })).toBeVisible();
  });

  describe("Login", () => {
    test("succeeds with correct credentials", async ({ page, request }) => {
      const { username, name, password } = await createTestUser(request);
      await loginWith(page, username, password);
      await expect(page.getByText(`${name} logged in`)).toBeVisible();
    });

    test("fails with wrong credentials", async ({ page, request }) => {
      const { username, name } = await createTestUser(request);
      await loginWith(page, username, "Wrong password");

      const errorDiv = await page.locator(".notification");
      await expect(errorDiv).toContainText("Wrong username or password");
      await expect(errorDiv).toHaveCSS("border-style", "solid");
      await expect(errorDiv).toHaveCSS("color", "rgb(88, 21, 28)");

      await expect(page.getByText(`${name} logged in`)).not.toBeVisible();
    });
  });

  describe("When logged in", () => {
    beforeEach(async ({ page, request }) => {
      const { username, name, password } = await createTestUser(request);
      await loginWith(page, username, password);
      await expect(page.getByText(`${name} logged in`)).toBeVisible();
    });

    test("a new blog can be created", async ({ page }) => {
      const suffix = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
      const title = `New title ${suffix}`;
      const author = `New author ${suffix}`;
      const url = `http://example.com/${suffix}`;
      await createBlog(page, title, author, url);
      await expect(
        page.getByText(`A new blog ${title} by ${author} added`)
      ).toBeVisible();
    });

    test("a blog can be edited", async ({ page }) => {
      const suffix = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
      const title = `New title ${suffix}`;
      const author = `New author ${suffix}`;
      const url = `http://example.com/${suffix}`;
      await createBlog(page, title, author, url);
      await expect(
        page.getByText(`A new blog ${title} by ${author} added`)
      ).toBeVisible();

      const blogRows = page.locator('[data-testid="blog-row"]');
      const blogRow = blogRows.filter({ hasText: title });
      await expect(blogRow).toHaveCount(1, { timeout: 10000 });
      await expect(blogRow.first().getByRole("link")).toBeVisible();
      await blogRow.first().getByRole("link").click();

      const blog = page.getByTestId("blog-item", {
        hasText: title,
      });
      await expect(blog).toBeVisible();

      await blog.getByRole("button", { name: "Edit" }).click();

      const editForm = page.getByTestId("blog-edit");
      await editForm.getByTestId("title-input").fill("Edited title");
      await editForm.getByTestId("author-input").fill("Edited author");
      await editForm.getByTestId("url-input").fill("Edited url");

      await editForm.getByRole("button", { name: "Save changes" }).click();

      await expect(
        page.getByText("The blog was updated successfully")
      ).toBeVisible();

      await expect(page.getByTestId("blog-edit")).toHaveCount(0);

      const editedBlog = page
        .locator('[data-testid="blog-item"]')
        .filter({ hasText: "Edited title" });
      await expect(editedBlog).toHaveCount(1, { timeout: 10000 });
    });

    test("a blog can be deleted", async ({ page }) => {
      const suffix = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
      const title = `New title ${suffix}`;
      const author = `New author ${suffix}`;
      const url = `http://example.com/${suffix}`;
      await createBlog(page, title, author, url);
      const blogRows = page.locator('[data-testid="blog-row"]');
      const blogRow = blogRows.filter({ hasText: title });
      await blogRow.getByRole("link", { name: title }).click();

      page.on("dialog", async (dialog) => {
        if (dialog.type() === "confirm") {
          await dialog.accept();
        } else {
          await dialog.dismiss();
        }
      });

      await page.getByRole("button", { name: "Remove" }).click();

      await expect(page.getByText("Blog deleted")).toBeVisible();
    });

    test("only the blog creator can delete it", async ({ page, request }) => {
      const suffix = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
      const title = `New title ${suffix}`;
      const author = `New author ${suffix}`;
      const url = `http://example.com/${suffix}`;
      await createBlog(page, title, author, url);
      const blogRows = page.locator('[data-testid="blog-row"]');
      await expect(blogRows.filter({ hasText: title })).toBeVisible();

      await page.getByRole("button", { name: "Logout" }).click();
      await expect(page.locator("div.card-title")).toHaveText("Log in");

      await request.post("/api/users", {
        data: {
          name: "Segundo usuario",
          username: "Usuario",
          password: "Contraseña",
        },
      });
      await loginWith(page, "Usuario", "Contraseña");
      await expect(page.getByText("Segundo usuario logged in")).toBeVisible();

      await page.getByRole("link", { name: title }).click();
      const blog = await page.getByTestId("blog-item", {
        hasText: title,
      });
      await expect(blog).toBeVisible();
      await expect(blog.getByRole("button", { name: "remove" })).toHaveCount(0);
    });
  });
});
