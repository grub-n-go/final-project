import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Encapsulates state and variable values for this collection. */
class VendorMenusCollection {
  constructor() {
    // The name of this collection.
    this.name = 'VendorMenusCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    const menuSchema = new SimpleSchema({
      menuItem: String,
      menuItemDescription: String,
    })
    this.schema = new SimpleSchema({
      vendorName: String,
      vendorPicture: String,
      menuTitle: String,
      menu: [menuSchema],
    }, { tracker: Tracker });
    // Ensure collection documents obey schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

export const VendorMenus = new VendorMenusCollection();
