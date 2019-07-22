import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class ParametersComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-parameters div table .btn-danger'));
  title = element.all(by.css('jhi-parameters div h2#page-heading span')).first();

  async clickOnCreateButton(timeout?: number) {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(timeout?: number) {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons() {
    return this.deleteButtons.count();
  }

  async getTitle() {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class ParametersUpdatePage {
  pageTitle = element(by.id('jhi-parameters-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  weeklyGoalInput = element(by.id('field_weeklyGoal'));
  weightSelect = element(by.id('field_weight'));
  parameterSelect = element(by.id('field_parameter'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setWeeklyGoalInput(weeklyGoal) {
    await this.weeklyGoalInput.sendKeys(weeklyGoal);
  }

  async getWeeklyGoalInput() {
    return await this.weeklyGoalInput.getAttribute('value');
  }

  async setWeightSelect(weight) {
    await this.weightSelect.sendKeys(weight);
  }

  async getWeightSelect() {
    return await this.weightSelect.element(by.css('option:checked')).getText();
  }

  async weightSelectLastOption(timeout?: number) {
    await this.weightSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async parameterSelectLastOption(timeout?: number) {
    await this.parameterSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async parameterSelectOption(option) {
    await this.parameterSelect.sendKeys(option);
  }

  getParameterSelect(): ElementFinder {
    return this.parameterSelect;
  }

  async getParameterSelectedOption() {
    return await this.parameterSelect.element(by.css('option:checked')).getText();
  }

  async save(timeout?: number) {
    await this.saveButton.click();
  }

  async cancel(timeout?: number) {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class ParametersDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-parameters-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-parameters'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
