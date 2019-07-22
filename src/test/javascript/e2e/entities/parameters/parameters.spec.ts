/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ParametersComponentsPage, ParametersDeleteDialog, ParametersUpdatePage } from './parameters.page-object';

const expect = chai.expect;

describe('Parameters e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let parametersUpdatePage: ParametersUpdatePage;
  let parametersComponentsPage: ParametersComponentsPage;
  let parametersDeleteDialog: ParametersDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Parameters', async () => {
    await navBarPage.goToEntity('parameters');
    parametersComponentsPage = new ParametersComponentsPage();
    await browser.wait(ec.visibilityOf(parametersComponentsPage.title), 5000);
    expect(await parametersComponentsPage.getTitle()).to.eq('twentyOnePointsApp.parameters.home.title');
  });

  it('should load create Parameters page', async () => {
    await parametersComponentsPage.clickOnCreateButton();
    parametersUpdatePage = new ParametersUpdatePage();
    expect(await parametersUpdatePage.getPageTitle()).to.eq('twentyOnePointsApp.parameters.home.createOrEditLabel');
    await parametersUpdatePage.cancel();
  });

  it('should create and save Parameters', async () => {
    const nbButtonsBeforeCreate = await parametersComponentsPage.countDeleteButtons();

    await parametersComponentsPage.clickOnCreateButton();
    await promise.all([
      parametersUpdatePage.setWeeklyGoalInput('5'),
      parametersUpdatePage.weightSelectLastOption(),
      parametersUpdatePage.parameterSelectLastOption()
    ]);
    expect(await parametersUpdatePage.getWeeklyGoalInput()).to.eq('5', 'Expected weeklyGoal value to be equals to 5');
    await parametersUpdatePage.save();
    expect(await parametersUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await parametersComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Parameters', async () => {
    const nbButtonsBeforeDelete = await parametersComponentsPage.countDeleteButtons();
    await parametersComponentsPage.clickOnLastDeleteButton();

    parametersDeleteDialog = new ParametersDeleteDialog();
    expect(await parametersDeleteDialog.getDialogTitle()).to.eq('twentyOnePointsApp.parameters.delete.question');
    await parametersDeleteDialog.clickOnConfirmButton();

    expect(await parametersComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
