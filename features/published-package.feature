Feature: Published Fabric Experiments packages work outside the monorepo

  Scenario: Seed and query an analyst result table
    Given a table "experiment_results" with:
      | variant_key | exposures | conversions |
      | control     | 100       | 12          |
      | treatment   | 100       | 18          |
    When I query table "experiment_results"
    Then the result has 2 rows
    And the result contains rows matching:
      | variant_key | conversions |
      | treatment   | 18          |

  @requires.profile=local
  Scenario: TypeScript provides Behave-equivalent composition and state
    Given TypeScript run and feature state
    When I remember columns "subject_id, event_name"
    Then the layered state contains "subject_id, event_name"
