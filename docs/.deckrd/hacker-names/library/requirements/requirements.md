---
title: "Requirements: hacker-names library"
module: "hacker-names/library"
status: Draft
version: 1.1.0
created: "2026-11-23"
---

> **Normative Statement**
> This document defines binding requirements.
> Implementations MUST conform to this document.
> RFC 2119 keywords apply to this document only.

## 1. Overview

### 1.1 Purpose

`@aglabo/hacker-names` を TypeScript ライブラリとして公開し、利用者が初期化時に辞書ファイルを指定して hacker name を生成できるようにする。

### 1.2 Scope

- TypeScript ライブラリとしての公開(`@aglabo/hacker-names`)
- 初期化時に辞書ファイル(形容詞・ハッカー)を指定し、組み込み辞書を置き換える機能
- 辞書の読み込み・検証エラーを種類別に判別できるエラークラス
- ハッカー辞書のバリデータ(ライブラリ機能として提供。辞書の形式は REQ-C-002 を参照)

**Out of Scope**:

- CLI ツール(本ライブラリを使って後から作成する。別モジュールで扱う)
- CLI のバリデータコマンド(本ライブラリのバリデータを使って後から作成する)
- 形容詞辞書のバリデータ
- 組み込み辞書と指定辞書のマージ
- 既存のトップレベル関数 `generate()` との互換性(初期段階のため考慮しない。REQ-F-001 のインスタンスが持つ `generate()` は新規に定義する)

## 2. Context

- Target Environment: Node.js >=24、ESM のみ、pnpm workspace(`packages/@aglabo/core`)
- Related Components:
  - `@aglabo/hacker-names-dict`: 組み込み辞書。YAML をビルド時に埋め込む
  - `@aglabo/hacker-names-dictionary`: 辞書のデータとスキーマ
  - `@aglabo/hacker-names-types`: `GenerateOptions`
  - `@aglabo/hacker-names-cli`: 将来の利用者
- Assumptions:
  - 組み込み辞書は現状の YAML 形式である。
    `adjectives.yaml` は単語配列である。
    `hackers.yaml` は `slug` をキーとする map で、各レコードは `fullname` / `description` / `category` を持つ。
    指定辞書の形式は REQ-C-002 と Open Questions で定める
  - 現状の `@aglabo/hacker-names` は v0.0.1 で未公開である
  - 公開関数名 `createDictionary` は仮名である。確定は実装時(impl)に行う

### System Context Diagram

```text
[TypeScript developer] --createDictionary(options)--> +---------------------------+ <-- [npm registry]
[CLI (future)]         --createDictionary(options)--> |  @aglabo/hacker-names     |     (publish / install)
                                                      |  (library)                |
[Dictionary files]  --------------------------------> |  - createDictionary()     |
  (YAML, user-supplied)                               |  - built-in dictionary    |
                                                      +---------------------------+
```

## 3. Design Decisions (Summary)

Decision Records は `/deckrd dr --add` で作成する。作成までは "pending" とする。

| ID    | Decision                                                                        | Linked Record |
| ----- | ------------------------------------------------------------------------------- | ------------- |
| DR-01 | 辞書はファイルパスで指定し、ライブラリが実行時に読み込む                        | pending       |
| DR-02 | 指定辞書は組み込み辞書を置き換える(マージしない)。未指定側は組み込み            | pending       |
| DR-03 | 読み込み・検証エラーは種類別のエラークラスで通知し、フォールバックしない        | pending       |
| DR-04 | 初期化はファクトリ関数(仮名 `createDictionary()`)とし、状態はインスタンスが持つ | pending       |

## 4. Functional Requirements

### REQ-F-001: ファクトリによる初期化

- EARS Type: event-driven

```text
GIVEN the library is installed
  WHEN a caller invokes createDictionary with or without options
THEN the system SHALL return an instance that holds the dictionaries selected at that call
  and that exposes generate().
```

**Rationale**: 辞書の選択は初期化時に 1 回だけ行い、以降は読み込み済みの辞書を使う(ヒアリング Q4, Q5)。
関数名 `createDictionary` は仮名であり、確定は実装時に行う。

**Acceptance Criteria**:

| AC ID  | Scenario                                   |
| ------ | ------------------------------------------ |
| AC-001 | 引数なしで組み込み辞書のインスタンスを得る |
| AC-004 | 辞書の異なる複数インスタンスが共存する     |

### REQ-F-002: 辞書ファイルの指定

- EARS Type: feature-based

```text
GIVEN a caller passes a file path for the adjective dictionary, the hacker dictionary, or both
  WHERE the dictionary file is in the format defined by REQ-C-002
THEN the system SHALL load each specified file once at initialization
  and SHALL use it in place of the corresponding built-in dictionary.
```

**Rationale**: 辞書ファイルを指定して置き換える(ヒアリング Q1, Q2)。
形式に適合しないファイルを指定した場合は REQ-F-005 に従う。

**Acceptance Criteria**:

| AC ID  | Scenario                 |
| ------ | ------------------------ |
| AC-002 | 形容詞辞書のみ指定する   |
| AC-003 | ハッカー辞書のみ指定する |

### REQ-F-003: 未指定時の組み込み辞書

- EARS Type: feature-based

```text
GIVEN a caller does not specify a dictionary file for one or both of the two dictionaries
THEN the system SHALL use the built-in dictionary for each unspecified one.
```

**Rationale**: 未指定の側は現在の組み込み辞書を使う(ヒアリング Q2)。

**Acceptance Criteria**:

| AC ID  | Scenario                           |
| ------ | ---------------------------------- |
| AC-001 | 引数なしで組み込み辞書を使う(再掲) |
| AC-002 | 形容詞辞書のみ指定する(再掲)       |
| AC-003 | ハッカー辞書のみ指定する(再掲)     |

### REQ-F-004: 初期化後のファイル非参照

- EARS Type: state-driven

```text
GIVEN an instance has been created
  WHILE the instance is in use
THEN the system SHALL generate names only from the dictionaries loaded at initialization
  and SHALL NOT read any dictionary file again.
```

**Rationale**: 読み込みは初期化時に限る(ヒアリング Q4)。

**Acceptance Criteria**:

| AC ID  | Scenario                                           |
| ------ | -------------------------------------------------- |
| AC-005 | 初期化後に辞書ファイルを変更しても結果が変わらない |

### REQ-F-005: 辞書エラーの通知

- EARS Type: unwanted behavior(失敗時の振る舞いを定める)

```text
GIVEN a caller specifies a dictionary file
  WHEN loading or validating that file fails
THEN the system SHALL fail initialization with an error whose class identifies the cause,
  distinguishing at least: file not found, syntax error, and schema violation
  and SHALL NOT ignore the specification or fall back to the built-in dictionary.
```

**Rationale**: 指定を無視して別の辞書で生成すると、利用者は気づけない。呼び出し側は、エラー種別を判別できなければならない(ヒアリング Q3)。

**Acceptance Criteria**:

| AC ID  | Scenario                             |
| ------ | ------------------------------------ |
| AC-006 | 存在しないパスを指定する             |
| AC-007 | YAML 構文が不正なファイルを指定する  |
| AC-008 | スキーマに違反するファイルを指定する |

### REQ-F-006: ライブラリとしての公開

- EARS Type: feature-based

```text
GIVEN the package @aglabo/hacker-names is built
  WHERE it is published to the npm registry
THEN the system SHALL provide ESM entry points and type declarations
  so that TypeScript users can import createDictionary, the hacker dictionary validator, and the error classes.
```

**Rationale**: TypeScript ライブラリとして公開する(USER INPUT)。

**Acceptance Criteria**:

| AC ID  | Scenario                                                  |
| ------ | --------------------------------------------------------- |
| AC-009 | 公開 API 一式を別プロジェクトから import して型付きで使う |

### REQ-F-007: ハッカー辞書のバリデータ

- EARS Type: event-driven

```text
GIVEN a caller has a hacker dictionary
  WHEN the caller invokes the hacker dictionary validator on it
THEN the system SHALL judge whether the dictionary conforms to the hacker dictionary format
  and SHALL report the cause when it does not conform.
```

**Rationale**: 辞書の作成者が、初期化せずに辞書の適合を確認できるようにする(USER INPUT)。
辞書の形式は REQ-C-002 に従う。検証の定義は初期化時の検証(REQ-F-005)と共有する(REQ-NF-001)。

**Acceptance Criteria**:

| AC ID  | Scenario                                       |
| ------ | ---------------------------------------------- |
| AC-010 | 形式に適合するハッカー辞書を検証する           |
| AC-011 | 形式に適合しないハッカー辞書の不適合理由を得る |

## 5. Non-Functional Requirements

### REQ-NF-001: Maintainability

辞書スキーマの検証定義は、組み込み辞書・指定辞書・バリデータ(REQ-F-007)で共有する(SHOULD)。

### REQ-NF-002: Testability

名前の生成で使う乱数源は、テストから差し替えられなければならない(MUST)。

### REQ-NF-003: Portability

辞書ファイルは UTF-8 の入力を受け付けなければならない(MUST)。

## 6. Constraints

### REQ-C-001: Runtime and module format

ライブラリは Node.js >=24 の ESM として動作しなければならない(MUST)。

### REQ-C-002: Dictionary format

指定辞書は YAML 形式でなければならない(MUST)。
形容詞辞書は `[a-z]+` の単語配列とする。
ハッカー辞書は、現状の形式(`slug` を含むレコード)を出発点とし、確定した形式に従う。形式の確定は Open Questions で扱う。

## 7. User Stories

| Story ID | Role              | Goal                                       | Reason                                      | Related Requirements |
| -------- | ----------------- | ------------------------------------------ | ------------------------------------------- | -------------------- |
| US-001   | TypeScript 開発者 | npm からライブラリをインストールして使う   | 自分のコードで hacker name を生成したいから | REQ-F-006, REQ-F-001 |
| US-002   | TypeScript 開発者 | 自分の辞書ファイルを指定して名前を生成する | 組み込み以外の名前や形容詞を使いたいから    | REQ-F-002, REQ-F-003 |
| US-003   | TypeScript 開発者 | 辞書の不備をエラーの種類で判別する         | 原因に応じて処理や表示を変えたいから        | REQ-F-005            |
| US-004   | CLI の作成者      | 辞書を指定して初期化したインスタンスを使う | CLI で辞書指定オプションを実装したいから    | REQ-F-001, REQ-F-002 |
| US-005   | 辞書の作成者      | 作った辞書が形式に適合するか確認する       | 使う前に不備を直したいから                  | REQ-F-007            |

## 8. Acceptance Criteria

```gherkin
# AC-001: 引数なしで組み込み辞書のインスタンスを得る
# Requirement: REQ-F-001, REQ-F-003
Scenario: Create an instance with built-in dictionaries
  Given the library is installed
  When  createDictionary is called without options
  Then  generate() returns names built from the built-in dictionaries

# AC-002: 形容詞辞書のみ指定する
# Requirement: REQ-F-002, REQ-F-003
Scenario: Specify only the adjective dictionary
  Given a valid adjective dictionary file
  When  createDictionary is called with only the adjective file
  Then  generated adjectives come from that file and hackers come from the built-in dictionary

# AC-003: ハッカー辞書のみ指定する
# Requirement: REQ-F-002, REQ-F-003
Scenario: Specify only the hacker dictionary
  Given a valid hacker dictionary file
  When  createDictionary is called with only the hacker file
  Then  generated hackers come from that file and adjectives come from the built-in dictionary

# AC-004: 辞書の異なる複数インスタンスが共存する
# Requirement: REQ-F-001
Scenario: Two instances with different dictionaries
  Given two different dictionary files
  When  two instances are created from them
  Then  each instance generates names only from its own dictionary

# AC-005: 初期化後に辞書ファイルを変更しても結果が変わらない
# Requirement: REQ-F-004
Scenario: Dictionary file changes after initialization
  Given an instance created from a dictionary file
  When  the file is modified after creation
  Then  generate() still uses the originally loaded dictionary

# AC-006: 存在しないパスを指定する
# Requirement: REQ-F-005
Scenario: Dictionary file not found
  Given a path that does not exist
  When  createDictionary is called with that path
  Then  it throws the file-not-found error class and does not fall back to the built-in dictionary

# AC-007: YAML 構文が不正なファイルを指定する
# Requirement: REQ-F-005
Scenario: Dictionary file has a syntax error
  Given a file with invalid YAML syntax
  When  createDictionary is called with that file
  Then  it throws the syntax error class

# AC-008: スキーマに違反するファイルを指定する
# Requirement: REQ-F-005
Scenario: Dictionary file violates the schema
  Given a YAML file whose entries do not match the dictionary schema
  When  createDictionary is called with that file
  Then  it throws the schema violation error class

# AC-009: 公開物を別プロジェクトから使う
# Requirement: REQ-F-006
Scenario: Consume the published package
  Given the package is installed in an external TypeScript project
  When  the project imports createDictionary, the hacker dictionary validator, and the error classes
  Then  every import resolves with type declarations

# AC-010: 形式に適合するハッカー辞書を検証する
# Requirement: REQ-F-007
Scenario: Validate a conforming hacker dictionary
  Given a hacker dictionary that conforms to the format
  When  the validator is invoked on it
  Then  it judges the dictionary as valid

# AC-011: 形式に適合しないハッカー辞書の不適合理由を得る
# Requirement: REQ-F-007
Scenario: Validate a non-conforming hacker dictionary
  Given a hacker dictionary that does not conform to the format
  When  the validator is invoked on it
  Then  it judges the dictionary as invalid and reports the cause
```

## 9. Open Questions

| Question                                                                                                 | Type       | Impact Area        | Owner |
| -------------------------------------------------------------------------------------------------------- | ---------- | ------------------ | ----- |
| REQ-F-001: 公開関数名(仮: `createDictionary`)の確定                                                      | EARS/type  | Public API         | TBD   |
| REQ-F-001: 初期化関数の引数名(`adjectivesFile` / `hackersFile` など)は何にするか                         | EARS/THEN  | Public API         | TBD   |
| REQ-F-001: 既存の `GenerateOptions`(`hackerOnly`、`rng`)を `generate()` に残すか、初期化時の指定にするか | EARS/type  | Public API         | TBD   |
| REQ-F-002: 相対パスの基準は呼び出し元プロセスの cwd でよいか                                             | EARS/GIVEN | Dictionary loading | TBD   |
| REQ-F-002: 初期化は同期か非同期か(ファイル読み込みの API 形状)                                           | EARS/type  | Public API         | TBD   |
| REQ-F-005: エラークラス名と階層(共通基底クラスを持つか)                                                  | EARS/THEN  | Public API         | TBD   |
| REQ-F-005: 空の辞書、重複する単語・slug は、どのエラー種別で扱うか                                       | EARS/GIVEN | Validation         | TBD   |
| REQ-F-006: 公開先 npm スコープ、provenance、リリース方法(CI)、初回バージョン                             | EARS/GIVEN | Release            | TBD   |
| REQ-F-006: `@aglabo/hacker-names/types` サブパスと、dict / types パッケージの公開要否                    | EARS/THEN  | Packaging          | TBD   |
| REQ-F-007: ハッカー辞書の形式(必須・任意項目、制約、`slug` だけの簡易形式を許すか)の確定                 | EARS/GIVEN | Dictionary format  | TBD   |
| REQ-F-007: バリデータの入力(パス / 読み込み済みデータ)、同期・非同期、結果の形(例外 / 結果オブジェクト)  | EARS/type  | Public API         | TBD   |
| REQ-F-007: 不適合理由は複数件か最初の 1 件か。REQ-F-005 のエラークラスと共有するか                       | EARS/THEN  | Validation         | TBD   |

## 10. Traceability

| REQ ID     | AC IDs                 | Type           |
| ---------- | ---------------------- | -------------- |
| REQ-F-001  | AC-001, AC-004         | Functional     |
| REQ-F-002  | AC-002, AC-003         | Functional     |
| REQ-F-003  | AC-001, AC-002, AC-003 | Functional     |
| REQ-F-004  | AC-005                 | Functional     |
| REQ-F-005  | AC-006, AC-007, AC-008 | Functional     |
| REQ-F-006  | AC-009                 | Functional     |
| REQ-F-007  | AC-010, AC-011         | Functional     |
| REQ-NF-001 | N/A                    | Non-Functional |
| REQ-NF-002 | N/A                    | Non-Functional |
| REQ-NF-003 | N/A                    | Non-Functional |
| REQ-C-001  | N/A                    | Constraint     |
| REQ-C-002  | N/A                    | Constraint     |

## 11. Change History

| Date       | Version | Description                                                                           |
| ---------- | ------- | ------------------------------------------------------------------------------------- |
| 2026-11-23 | 1.0.0   | Initial release                                                                       |
| 2026-11-23 | 1.1.0   | Tentative factory name; add REQ-F-007 validator; clarify wording and cross-references |
