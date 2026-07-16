import type { FRAMEWORK_OPTIONS, LANGUAGE_OPTIONS } from "../consts.ts";

export type Language = (typeof LANGUAGE_OPTIONS)[number]["value"];
export type Framework = (typeof FRAMEWORK_OPTIONS)[number]["value"];

export interface ProjectConfig {
  projectName: string;

  language: Language;

  framework: Framework;
}
