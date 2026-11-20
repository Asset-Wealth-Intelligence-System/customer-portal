import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default class PortalHomeController extends Controller {
    @service intl;
    @service currentUser;
    @service customerSession;

    get customerName() {
        return this.customerSession.get('name') || this.currentUser.name;
    }

    get accountTypeLabel() {
        return this.customerSession.accountType === 'vendor' ? this.intl.t('literal.customer-portal.company-customer-workspace') : this.intl.t('literal.customer-portal.customer-workspace');
    }
}
