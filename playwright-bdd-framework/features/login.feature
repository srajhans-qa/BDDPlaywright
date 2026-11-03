# This feature file describes the login behavior of the SauceDemo application.
# Gherkin is plain English and makes the expected behavior easy to read for non-technical users.
Feature: Login functionality

  @smoke
  Scenario: Successful login with valid credentials
    Given I navigate to the login page
    When I enter valid username and password
    And I click the login button
    Then I should be successfully logged in

  @regression
  Scenario: Login with invalid credentials
    Given I navigate to the login page
    When I enter invalid username and password
    And I click the login button
    Then I should see an error message indicating invalid credentials
