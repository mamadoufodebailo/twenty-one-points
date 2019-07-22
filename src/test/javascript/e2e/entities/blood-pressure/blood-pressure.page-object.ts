import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class BloodPressureComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-blood-pressure div table .btn-danger'));
  title = element.all(by.css('jhi-blood-pressure div h2#page-heading span')).first();

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

export class BloodPressureUpdatePage {
  pageTitle = element(by.id('jhi-blood-pressure-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  dateInput = element(by.id('field_date'));
  systolicInput = element(by.id('field_systolic'));
  diastolicInput = element(by.id('field_diastolic'));
  userSelect = element(by.id('field_user'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setDateInput(date) {
    await this.dateInput.sendKeys(date);
  }

  async getDateInput() {
    return await this.dateInput.getAttribute('value');
  }

  async setSystolicInput(systolic) {
    await this.systolicInput.sendKeys(systolic);
  }

  async getSystolicInput() {
    return await this.systolicInput.getAttribute('value');
  }

  async setDiastolicInput(diastolic) {
    await this.diastolicInput.sendKeys(diastolic);
  }

  async getDiastolicInput() {
    return await this.diastolicInput.getAttribute('value');
  }

  async userSelectLastOption(timeout?: number) {
    await this.userSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async userSelectOption(option) {
    await this.userSelect.sendKeys(option);
  }

  getUserSelect(): ElementFinder {
    return this.userSelect;
  }

  async getUserSelectedOption() {
    return await this.userSelect.element(by.css('option:checked')).getText();
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

export class BloodPressureDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-bloodPressure-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-bloodPressure'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
