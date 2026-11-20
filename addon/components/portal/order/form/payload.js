import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class PortalOrderFormPayloadComponent extends Component {
    @service intl;
    @service customerPortalOrderCreation;

    get entityTypes() {
        return [
        { label: this.intl.t('literal.customer-portal.entity'), value: 'entity', description: this.intl.t('literal.customer-portal.standard-generic-entity-representing-an-item') },
        { label: this.intl.t('literal.customer-portal.parcel'), value: 'parcel', description: this.intl.t('literal.customer-portal.standard-parcel-or-package-used-by-parcel-based-45476') },
        { label: this.intl.t('literal.customer-portal.package'), value: 'package', description: this.intl.t('literal.customer-portal.box-parcel-envelope-or-general-package') },
        { label: this.intl.t('literal.customer-portal.product'), value: 'product', description: this.intl.t('literal.customer-portal.sellable-product-or-catalog-item') },
        { label: this.intl.t('literal.customer-portal.item'), value: 'item', description: this.intl.t('literal.customer-portal.generic-inventory-item-when-no-stronger-type-app-700f0') },
        { label: this.intl.t('literal.customer-portal.sku-inventory-unit'), value: 'sku', description: this.intl.t('literal.customer-portal.stock-keeping-unit-or-tracked-inventory-piece') },
        { label: this.intl.t('literal.customer-portal.document'), value: 'document', description: this.intl.t('literal.customer-portal.paperwork-labels-or-documents') },
        { label: this.intl.t('literal.customer-portal.envelope'), value: 'envelope', description: this.intl.t('literal.customer-portal.flat-document-mailer-or-envelope') },
        { label: this.intl.t('literal.customer-portal.box'), value: 'box', description: this.intl.t('literal.customer-portal.single-boxed-shipment-unit') },
        { label: this.intl.t('literal.customer-portal.carton'), value: 'carton', description: this.intl.t('literal.customer-portal.single-carton-box-or-case') },
        { label: this.intl.t('literal.customer-portal.case'), value: 'case', description: this.intl.t('literal.customer-portal.case-packed-goods-or-packaged-case') },
        { label: this.intl.t('literal.customer-portal.bundle'), value: 'bundle', description: this.intl.t('literal.customer-portal.bundled-or-strapped-items-shipped-together') },
        { label: this.intl.t('literal.customer-portal.bag'), value: 'bag', description: this.intl.t('literal.customer-portal.bagged-goods-sacks-or-pouches') },
        { label: this.intl.t('literal.customer-portal.tote'), value: 'tote', description: this.intl.t('literal.customer-portal.reusable-tote-bin-or-container') },
        { label: this.intl.t('literal.customer-portal.crate'), value: 'crate', description: this.intl.t('literal.customer-portal.rigid-crate-or-caged-shipment-unit') },
        { label: this.intl.t('literal.customer-portal.pallet'), value: 'pallet', description: this.intl.t('literal.customer-portal.palletized-freight-or-grouped-cargo') },
        { label: this.intl.t('literal.customer-portal.container'), value: 'container', description: this.intl.t('literal.customer-portal.containerized-shipment-or-storage-container') },
        { label: this.intl.t('literal.customer-portal.freight'), value: 'freight', description: this.intl.t('literal.customer-portal.loose-freight-or-larger-shipment-unit') },
        { label: this.intl.t('literal.customer-portal.cargo'), value: 'cargo', description: this.intl.t('literal.customer-portal.general-cargo-not-classified-more-specifically') },
        { label: this.intl.t('literal.customer-portal.equipment'), value: 'equipment', description: this.intl.t('literal.customer-portal.tools-machines-or-operational-equipment') },
        { label: this.intl.t('literal.customer-portal.machinery'), value: 'machinery', description: this.intl.t('literal.customer-portal.industrial-machinery-or-large-mechanical-unit') },
        { label: this.intl.t('literal.customer-portal.asset'), value: 'asset', description: this.intl.t('literal.customer-portal.tracked-business-asset-or-returnable-item') },
        { label: this.intl.t('literal.customer-portal.return'), value: 'return', description: this.intl.t('literal.customer-portal.returned-goods-or-reverse-logistics-item') },
        { label: this.intl.t('literal.customer-portal.sample'), value: 'sample', description: this.intl.t('literal.customer-portal.sample-item-for-trial-demo-or-inspection') },
        { label: this.intl.t('literal.customer-portal.spare-part'), value: 'spare_part', description: this.intl.t('literal.customer-portal.replacement-component-or-service-part') },
        { label: this.intl.t('literal.customer-portal.medical-supply'), value: 'medical_supply', description: this.intl.t('literal.customer-portal.healthcare-lab-or-medical-delivery-item') },
        { label: this.intl.t('literal.customer-portal.food'), value: 'food', description: this.intl.t('literal.customer-portal.prepared-food-meal-or-grocery-item') },
        { label: this.intl.t('literal.customer-portal.beverage'), value: 'beverage', description: this.intl.t('literal.customer-portal.drink-liquid-refreshment-or-bottled-shipment') },
        { label: this.intl.t('literal.customer-portal.retail-goods'), value: 'retail_goods', description: this.intl.t('literal.customer-portal.general-consumer-or-retail-merchandise') },
    ];
    }
    weightUnits = ['kg', 'lb'];
    dimensionUnits = ['cm', 'in'];

    get actionButtons() {
        return [
            {
                text: this.intl.t('literal.customer-portal.add-item'),
                icon: 'square-plus',
                size: 'xs',
                onClick: this.addEntity,
                wrapperClass: 'portal-order-panel-action-button',
            },
        ];
    }

    @action addEntity() {
        this.customerPortalOrderCreation.addEntity();
    }

    @action setEntityValue(index, field, value) {
        this.customerPortalOrderCreation.setEntityField(index, field, value?.value ?? value);
    }

    @action setEntityInput(index, field, event) {
        this.customerPortalOrderCreation.setEntityField(index, field, event.target.value);
    }

    @action removeEntity(entity) {
        this.customerPortalOrderCreation.removeEntity(entity);
    }
}
