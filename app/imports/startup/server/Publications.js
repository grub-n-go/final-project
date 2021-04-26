import { Meteor } from 'meteor/meteor';
import { Interests } from '../../api/interests/Interests';
import { Profiles } from '../../api/profiles/Profiles';
import { ProfilesInterests } from '../../api/profiles/ProfilesInterests';
import { ProfilesProjects } from '../../api/profiles/ProfilesProjects';
import { Projects } from '../../api/projects/Projects';
import { ProjectsInterests } from '../../api/projects/ProjectsInterests';
import { Vendors } from '../../api/vendor/Vendors';
import { VendorTypes } from '../../api/vendor/VendorTypes';
import { VendorClass } from '../../api/interests/vendorClassifications';

/** Define a publication to publish all interests. */
Meteor.publish(Interests.userPublicationName, () => Interests.collection.find());

/** Define a publication to publish all vendor classification. */
Meteor.publish(VendorClass.userPublicationName, () => VendorClass.collection.find());

/** Define a publication to publish all profiles. */
Meteor.publish(Profiles.userPublicationName, () => Profiles.collection.find());

/** Define a publication to publish all vendors. */
Meteor.publish(Vendors.userPublicationName, () => Vendors.collection.find());

/** Define a publication to publish this collection. */
Meteor.publish(ProfilesInterests.userPublicationName, () => ProfilesInterests.collection.find());

/** Define a publication to publish this collection VendorTpyes. */
Meteor.publish(VendorTypes.userPublicationName, () => VendorTypes.collection.find());

/** Define a publication to publish this collection. */
Meteor.publish(ProfilesProjects.userPublicationName, () => ProfilesProjects.collection.find());

/** Define a publication to publish all projects. */
Meteor.publish(Projects.userPublicationName, () => Projects.collection.find());

/** Define a publication to publish this collection. */
Meteor.publish(ProjectsInterests.userPublicationName, () => ProjectsInterests.collection.find());

// alanning:roles publication
// Recommended code to publish roles for each user.
Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  }
  return this.ready();
});
