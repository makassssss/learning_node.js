Feature: Auth
  As an user I want to be able to login and logout

  Background:
    Given I navigate to "/login"

  Scenario: Log in with right credentials
    When I enter my username "user" and password "user"
    And I submit the form
    Then I should see the home page
    Then I should be able to logout

  Scenario: Log in with wrong credentials
    When I enter my username "user" and password "wrong_password"
    And I submit the form
    Then I should see an error