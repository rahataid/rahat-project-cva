export const NAMESPACE = 'rahat.projects';

export const CONTROLLERS = {
  BENEFICIARY: {
    CREATE: NAMESPACE + '.beneficiary.create',
    LIST: NAMESPACE + '.beneficiary.list',
    LISTONE: NAMESPACE + '.beneficiary.listone',
    UPDATE: NAMESPACE + '.beneficiary.update',
  },
  PROJECT: {
    CREATE: NAMESPACE + '.project.create',
    LIST: NAMESPACE + '.project.list',
    LISTONE: NAMESPACE + '.project.listone',
    UPDATE: NAMESPACE + '.project.update',
    REMOVE: NAMESPACE + '.project.remove',
  },
  REPORTING: {
    LIST: NAMESPACE + '.reporting.projectlist',
  },
  APPSETTING: {
    CREATE: NAMESPACE + '.appsetting.create',
    LIST: NAMESPACE + '.appsetting.list',
    LISTONE: NAMESPACE + '.appsetting.listone',
    UPDATE: NAMESPACE + '.appsetting.update',
    REMOVE: NAMESPACE + '.appsetting.remove',
  },
  VENDOR: {
    CREATE: NAMESPACE + '.vendor.create',
    LIST: NAMESPACE + '.vendor.list',
    LISTONE: NAMESPACE + '.vendor.listone',
    UPDATE: NAMESPACE + '.vendor.update',
    BLOCKCHAIN: NAMESPACE + '.vendor.blockchain',
  },
};
export const QUEUE = {
  RAHAT: 'RAHAT',
  RAHAT_PROJECT: 'RAHAT_PROJECT',
};

export const JOBS = {
  BENEFICIARY: {
    CREATE: 'rahat.jobs.beneficiary.create',
    LIST: 'rahat.jobs.beneficiary.list',
    GET: 'rahat.jobs.beneficiary.get',
    UPDATE: 'rahat.jobs.beneficiary.update',
    ADD_TO_PROJECT: 'rahat.jobs.beneficiary.add_to_project',
    BULK_ASSIGN_TO_PROJECT: 'rahat.jobs.beneficiary.bulk_assign',
    VERIFY_SIGNATURE: 'rahat.jobs.beneficiary.verify_signature',
  },

  PROJECT: {
    CREATE: 'rahat.jobs.project.create',
    LIST: 'rahat.jobs.project.list',
    GET: 'rahat.jobs.project.get',
    UPDATE: 'rahat.jobs.project.update',
    UPDATE_ADMIN: 'rahat.jobs.project.add_admin',
  },
  REPORTING: {
    LIST: 'rahat.jobs.reporting.list',
  },
  SETTINGS: {
    CREATE: 'rahat.jobs.settings.create',
    LIST: 'rahat.jobs.settings.list',
    GET: 'rahat.jobs.settings.get',
    UPDATE: 'rahat.jobs.settings.update',
    REMOVE: 'rahat.jobs.settings.remove',
  },
  CAMPAIGN: {
    CREATE: 'rahat.jobs.campaign.create',
    LIST: 'rahat.jobs.campaign.list',
    GET: 'rahat.jobs.campaign.get',
    REMOVE: 'rahat.jobs.campaign.remove',
  },
  VENDOR: {
    CREATE: 'rahat.jobs.vendor.add_to_project',
    LIST: 'rahat.jobs.vendor.list',
    GET: 'rahat.jobs.vendor.get',
    UPDATE: 'rahat.jobs.vendor.update',
  },
};

export const APP = {
  SETTINGS: null,
};
