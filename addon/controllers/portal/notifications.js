import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { task } from 'ember-concurrency';

const DEFAULT_PREFERENCES = {
    order_created: true,
    order_dispatched: true,
    order_delayed: true,
    driver_nearby: true,
    order_delivered: true,
    invoice_due: true,
    invoice_paid: true,
    ticket_updated: true,
    document_available: true,
};


export default class PortalNotificationsController extends Controller {
    get PREFERENCE_GROUPS() {
        return [
        {
            title: this.intl.t('literal.customer-portal.orders'),
            description: this.intl.t('literal.customer-portal.operational-updates-while-your-shipments-move-th-35f1f'),
            keys: ['order_created', 'order_dispatched', 'order_delayed', 'driver_nearby', 'order_delivered'],
        },
        {
            title: this.intl.t('literal.customer-portal.billing'),
            description: this.intl.t('literal.customer-portal.invoice-and-payment-status-updates-from-your-acc-59ebf'),
            keys: ['invoice_due', 'invoice_paid'],
        },
        {
            title: this.intl.t('literal.customer-portal.support'),
            description: this.intl.t('literal.customer-portal.updates-when-your-customer-support-tickets-chang-8e24a'),
            keys: ['ticket_updated'],
        },
        {
            title: this.intl.t('literal.customer-portal.documents'),
            description: this.intl.t('literal.customer-portal.alerts-when-labels-pods-receipts-or-related-file-95a55'),
            keys: ['document_available'],
        },
    ];
    }

    @service intl;
    @service fetch;
    @service notifications;

    @tracked preferences = { ...DEFAULT_PREFERENCES };

    constructor() {
        super(...arguments);
        this.preferences = { ...DEFAULT_PREFERENCES, ...(this.model?.preferences ?? {}) };
    }

    get preferenceGroups() {
        return this.PREFERENCE_GROUPS.map((group) => {
            return {
                ...group,
                items: group.keys.map((key) => {
                    return {
                        key,
                        label: this.preferenceLabel(key),
                        enabled: this.preferences[key],
                    };
                }),
            };
        });
    }

    preferenceLabel(key) {
        return key
            .split('_')
            .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
            .join(' ');
    }

    @action setPreference(key, event) {
        this.preferences = { ...this.preferences, [key]: event.target.checked };
    }

    @task *savePreferences() {
        try {
            const response = yield this.fetch.post('notification-preferences', { preferences: this.preferences }, { namespace: 'customer-portal/int/v1' });
            this.preferences = response.preferences ?? this.preferences;
            this.notifications.success(this.intl.t('literal.customer-portal.notification-preferences-saved'));
        } catch (error) {
            this.notifications.serverError(error);
        }
    }
}
