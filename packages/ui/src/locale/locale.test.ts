import { describe, expect, it } from "vitest";
import { useLocale } from "./index";
import { zhCN, enUS } from "./messages";

describe("i18n locale injection system", () => {
  it("returns default zhCN messages when no context is active", () => {
    const { locale, messages } = useLocale();
    expect(locale.value).toBe("zh-CN");
    expect(messages.value.pagination.prev).toBe("上一页");
    expect(messages.value.empty.defaultTitle).toBe("暂无数据");
    expect(messages.value.command.emptyText).toBe("没有找到匹配的命令。");
  });

  it("switches between locales dynamically", () => {
    const { locale, messages, setLocale } = useLocale();
    setLocale("en-US");
    expect(locale.value).toBe("en-US");
    expect(messages.value.pagination.prev).toBe("Previous");
    expect(messages.value.empty.defaultTitle).toBe("No data available");

    setLocale("zh-CN");
    expect(locale.value).toBe("zh-CN");
    expect(messages.value.pagination.prev).toBe("上一页");
  });

  it("supports custom message overrides", () => {
    const { locale, messages, setLocale } = useLocale();
    setLocale("en-US", {
      pagination: {
        prev: "Go Back",
      },
    });
    expect(locale.value).toBe("en-US");
    expect(messages.value.pagination.prev).toBe("Go Back");
    expect(messages.value.pagination.next).toBe("Next");
  });

  it("formats parameterized pagination and rules correctly", () => {
    expect(zhCN.pagination.pageSummary(2, 10)).toBe("第 2 / 10 页");
    expect(enUS.pagination.pageSummary(2, 10)).toBe("Page 2 of 10");
    expect(zhCN.pagination.totalSummary(1, 5, 50)).toBe("第 1 / 5 页，共 50 条");
    expect(enUS.pagination.totalSummary(1, 5, 50)).toBe("Page 1 of 5, 50 total");

    expect(zhCN.fileUpload.fileLimitReject(3)).toBe("最多上传 3 个文件");
    expect(enUS.fileUpload.fileLimitReject(3)).toBe("Maximum 3 files allowed");
  });
});
