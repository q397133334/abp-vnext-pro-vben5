// This file is auto-generated by @hey-api/openapi-ts

import type {
  DeleteApiAppBookByIdData,
  DeleteApiAppBookByIdError,
  DeleteApiAppBookByIdResponse,
  DeleteApiFeatureManagementFeaturesData,
  DeleteApiFeatureManagementFeaturesError,
  DeleteApiFeatureManagementFeaturesResponse,
  DeleteApiIdentityRolesByIdData,
  DeleteApiIdentityRolesByIdError,
  DeleteApiIdentityRolesByIdResponse,
  DeleteApiIdentityUsersByIdData,
  DeleteApiIdentityUsersByIdError,
  DeleteApiIdentityUsersByIdResponse,
  DeleteApiMultiTenancyTenantsByIdData,
  DeleteApiMultiTenancyTenantsByIdDefaultConnectionStringData,
  DeleteApiMultiTenancyTenantsByIdDefaultConnectionStringError,
  DeleteApiMultiTenancyTenantsByIdDefaultConnectionStringResponse,
  DeleteApiMultiTenancyTenantsByIdError,
  DeleteApiMultiTenancyTenantsByIdResponse,
  GetApiAbpApiDefinitionData,
  GetApiAbpApiDefinitionError,
  GetApiAbpApiDefinitionResponse,
  GetApiAbpApplicationConfigurationData,
  GetApiAbpApplicationConfigurationError,
  GetApiAbpApplicationConfigurationResponse,
  GetApiAbpApplicationLocalizationData,
  GetApiAbpApplicationLocalizationError,
  GetApiAbpApplicationLocalizationResponse,
  GetApiAbpMultiTenancyTenantsByIdByIdData,
  GetApiAbpMultiTenancyTenantsByIdByIdError,
  GetApiAbpMultiTenancyTenantsByIdByIdResponse,
  GetApiAbpMultiTenancyTenantsByNameByNameData,
  GetApiAbpMultiTenancyTenantsByNameByNameError,
  GetApiAbpMultiTenancyTenantsByNameByNameResponse,
  GetApiAccountLogoutError,
  GetApiAccountLogoutResponse,
  GetApiAccountMyProfileError,
  GetApiAccountMyProfileResponse,
  GetApiAppBookByIdData,
  GetApiAppBookByIdError,
  GetApiAppBookByIdResponse,
  GetApiAppBookData,
  GetApiAppBookError,
  GetApiAppBookResponse,
  GetApiFeatureManagementFeaturesData,
  GetApiFeatureManagementFeaturesError,
  GetApiFeatureManagementFeaturesResponse,
  GetApiIdentityRolesAllError,
  GetApiIdentityRolesAllResponse,
  GetApiIdentityRolesByIdData,
  GetApiIdentityRolesByIdError,
  GetApiIdentityRolesByIdResponse,
  GetApiIdentityRolesData,
  GetApiIdentityRolesError,
  GetApiIdentityRolesResponse,
  GetApiIdentityUsersAssignableRolesError,
  GetApiIdentityUsersAssignableRolesResponse,
  GetApiIdentityUsersByEmailByEmailData,
  GetApiIdentityUsersByEmailByEmailError,
  GetApiIdentityUsersByEmailByEmailResponse,
  GetApiIdentityUsersByIdData,
  GetApiIdentityUsersByIdError,
  GetApiIdentityUsersByIdResponse,
  GetApiIdentityUsersByIdRolesData,
  GetApiIdentityUsersByIdRolesError,
  GetApiIdentityUsersByIdRolesResponse,
  GetApiIdentityUsersByUsernameByUserNameData,
  GetApiIdentityUsersByUsernameByUserNameError,
  GetApiIdentityUsersByUsernameByUserNameResponse,
  GetApiIdentityUsersData,
  GetApiIdentityUsersError,
  GetApiIdentityUsersLookupByIdData,
  GetApiIdentityUsersLookupByIdError,
  GetApiIdentityUsersLookupByIdResponse,
  GetApiIdentityUsersLookupByUsernameByUserNameData,
  GetApiIdentityUsersLookupByUsernameByUserNameError,
  GetApiIdentityUsersLookupByUsernameByUserNameResponse,
  GetApiIdentityUsersLookupCountData,
  GetApiIdentityUsersLookupCountError,
  GetApiIdentityUsersLookupCountResponse,
  GetApiIdentityUsersLookupSearchData,
  GetApiIdentityUsersLookupSearchError,
  GetApiIdentityUsersLookupSearchResponse,
  GetApiIdentityUsersResponse,
  GetApiMultiTenancyTenantsByIdData,
  GetApiMultiTenancyTenantsByIdDefaultConnectionStringData,
  GetApiMultiTenancyTenantsByIdDefaultConnectionStringError,
  GetApiMultiTenancyTenantsByIdDefaultConnectionStringResponse,
  GetApiMultiTenancyTenantsByIdError,
  GetApiMultiTenancyTenantsByIdResponse,
  GetApiMultiTenancyTenantsData,
  GetApiMultiTenancyTenantsError,
  GetApiMultiTenancyTenantsResponse,
  GetApiPermissionManagementPermissionsData,
  GetApiPermissionManagementPermissionsError,
  GetApiPermissionManagementPermissionsResponse,
  GetApiSettingManagementEmailingError,
  GetApiSettingManagementEmailingResponse,
  GetApiSettingManagementTimezoneError,
  GetApiSettingManagementTimezoneResponse,
  GetApiSettingManagementTimezoneTimezonesError,
  GetApiSettingManagementTimezoneTimezonesResponse,
  PostApiAccountCheckPasswordData,
  PostApiAccountCheckPasswordError,
  PostApiAccountCheckPasswordResponse,
  PostApiAccountDynamicClaimsRefreshError,
  PostApiAccountDynamicClaimsRefreshResponse,
  PostApiAccountLoginData,
  PostApiAccountLoginError,
  PostApiAccountLoginResponse,
  PostApiAccountMyProfileChangePasswordData,
  PostApiAccountMyProfileChangePasswordError,
  PostApiAccountMyProfileChangePasswordResponse,
  PostApiAccountRegisterData,
  PostApiAccountRegisterError,
  PostApiAccountRegisterResponse,
  PostApiAccountResetPasswordData,
  PostApiAccountResetPasswordError,
  PostApiAccountResetPasswordResponse,
  PostApiAccountSendPasswordResetCodeData,
  PostApiAccountSendPasswordResetCodeError,
  PostApiAccountSendPasswordResetCodeResponse,
  PostApiAccountVerifyPasswordResetTokenData,
  PostApiAccountVerifyPasswordResetTokenError,
  PostApiAccountVerifyPasswordResetTokenResponse,
  PostApiAppBookData,
  PostApiAppBookError,
  PostApiAppBookResponse,
  PostApiIdentityRolesData,
  PostApiIdentityRolesError,
  PostApiIdentityRolesResponse,
  PostApiIdentityUsersData,
  PostApiIdentityUsersError,
  PostApiIdentityUsersResponse,
  PostApiMultiTenancyTenantsData,
  PostApiMultiTenancyTenantsError,
  PostApiMultiTenancyTenantsResponse,
  PostApiSettingManagementEmailingData,
  PostApiSettingManagementEmailingError,
  PostApiSettingManagementEmailingResponse,
  PostApiSettingManagementEmailingSendTestEmailData,
  PostApiSettingManagementEmailingSendTestEmailError,
  PostApiSettingManagementEmailingSendTestEmailResponse,
  PostApiSettingManagementTimezoneData,
  PostApiSettingManagementTimezoneError,
  PostApiSettingManagementTimezoneResponse,
  PutApiAccountMyProfileData,
  PutApiAccountMyProfileError,
  PutApiAccountMyProfileResponse,
  PutApiAppBookByIdData,
  PutApiAppBookByIdError,
  PutApiAppBookByIdResponse,
  PutApiFeatureManagementFeaturesData,
  PutApiFeatureManagementFeaturesError,
  PutApiFeatureManagementFeaturesResponse,
  PutApiIdentityRolesByIdData,
  PutApiIdentityRolesByIdError,
  PutApiIdentityRolesByIdResponse,
  PutApiIdentityUsersByIdData,
  PutApiIdentityUsersByIdError,
  PutApiIdentityUsersByIdResponse,
  PutApiIdentityUsersByIdRolesData,
  PutApiIdentityUsersByIdRolesError,
  PutApiIdentityUsersByIdRolesResponse,
  PutApiMultiTenancyTenantsByIdData,
  PutApiMultiTenancyTenantsByIdDefaultConnectionStringData,
  PutApiMultiTenancyTenantsByIdDefaultConnectionStringError,
  PutApiMultiTenancyTenantsByIdDefaultConnectionStringResponse,
  PutApiMultiTenancyTenantsByIdError,
  PutApiMultiTenancyTenantsByIdResponse,
  PutApiPermissionManagementPermissionsData,
  PutApiPermissionManagementPermissionsError,
  PutApiPermissionManagementPermissionsResponse,
} from './types.gen';

import {
  createClient,
  createConfig,
  type Options,
} from '@hey-api/client-axios';

export const client = createClient(createConfig());

export const getApiAbpApiDefinition = <ThrowOnError extends boolean = false>(
  options?: Options<GetApiAbpApiDefinitionData, ThrowOnError>,
) => {
  return (options?.client ?? client).get<
    GetApiAbpApiDefinitionResponse,
    GetApiAbpApiDefinitionError,
    ThrowOnError
  >({
    ...options,
    url: '/api/abp/api-definition',
  });
};

export const getApiAbpApplicationConfiguration = <
  ThrowOnError extends boolean = false,
>(
  options?: Options<GetApiAbpApplicationConfigurationData, ThrowOnError>,
) => {
  return (options?.client ?? client).get<
    GetApiAbpApplicationConfigurationResponse,
    GetApiAbpApplicationConfigurationError,
    ThrowOnError
  >({
    ...options,
    url: '/api/abp/application-configuration',
  });
};

export const getApiAbpApplicationLocalization = <
  ThrowOnError extends boolean = false,
>(
  options: Options<GetApiAbpApplicationLocalizationData, ThrowOnError>,
) => {
  return (options?.client ?? client).get<
    GetApiAbpApplicationLocalizationResponse,
    GetApiAbpApplicationLocalizationError,
    ThrowOnError
  >({
    ...options,
    url: '/api/abp/application-localization',
  });
};

export const getApiAbpMultiTenancyTenantsByNameByName = <
  ThrowOnError extends boolean = false,
>(
  options: Options<GetApiAbpMultiTenancyTenantsByNameByNameData, ThrowOnError>,
) => {
  return (options?.client ?? client).get<
    GetApiAbpMultiTenancyTenantsByNameByNameResponse,
    GetApiAbpMultiTenancyTenantsByNameByNameError,
    ThrowOnError
  >({
    ...options,
    url: '/api/abp/multi-tenancy/tenants/by-name/{name}',
  });
};

export const getApiAbpMultiTenancyTenantsByIdById = <
  ThrowOnError extends boolean = false,
>(
  options: Options<GetApiAbpMultiTenancyTenantsByIdByIdData, ThrowOnError>,
) => {
  return (options?.client ?? client).get<
    GetApiAbpMultiTenancyTenantsByIdByIdResponse,
    GetApiAbpMultiTenancyTenantsByIdByIdError,
    ThrowOnError
  >({
    ...options,
    url: '/api/abp/multi-tenancy/tenants/by-id/{id}',
  });
};

export const postApiAccountRegister = <ThrowOnError extends boolean = false>(
  options?: Options<PostApiAccountRegisterData, ThrowOnError>,
) => {
  return (options?.client ?? client).post<
    PostApiAccountRegisterResponse,
    PostApiAccountRegisterError,
    ThrowOnError
  >({
    ...options,
    url: '/api/account/register',
  });
};

export const postApiAccountSendPasswordResetCode = <
  ThrowOnError extends boolean = false,
>(
  options?: Options<PostApiAccountSendPasswordResetCodeData, ThrowOnError>,
) => {
  return (options?.client ?? client).post<
    PostApiAccountSendPasswordResetCodeResponse,
    PostApiAccountSendPasswordResetCodeError,
    ThrowOnError
  >({
    ...options,
    url: '/api/account/send-password-reset-code',
  });
};

export const postApiAccountVerifyPasswordResetToken = <
  ThrowOnError extends boolean = false,
>(
  options?: Options<PostApiAccountVerifyPasswordResetTokenData, ThrowOnError>,
) => {
  return (options?.client ?? client).post<
    PostApiAccountVerifyPasswordResetTokenResponse,
    PostApiAccountVerifyPasswordResetTokenError,
    ThrowOnError
  >({
    ...options,
    url: '/api/account/verify-password-reset-token',
  });
};

export const postApiAccountResetPassword = <
  ThrowOnError extends boolean = false,
>(
  options?: Options<PostApiAccountResetPasswordData, ThrowOnError>,
) => {
  return (options?.client ?? client).post<
    PostApiAccountResetPasswordResponse,
    PostApiAccountResetPasswordError,
    ThrowOnError
  >({
    ...options,
    url: '/api/account/reset-password',
  });
};

export const getApiAppBookById = <ThrowOnError extends boolean = false>(
  options: Options<GetApiAppBookByIdData, ThrowOnError>,
) => {
  return (options?.client ?? client).get<
    GetApiAppBookByIdResponse,
    GetApiAppBookByIdError,
    ThrowOnError
  >({
    ...options,
    url: '/api/app/book/{id}',
  });
};

export const putApiAppBookById = <ThrowOnError extends boolean = false>(
  options: Options<PutApiAppBookByIdData, ThrowOnError>,
) => {
  return (options?.client ?? client).put<
    PutApiAppBookByIdResponse,
    PutApiAppBookByIdError,
    ThrowOnError
  >({
    ...options,
    url: '/api/app/book/{id}',
  });
};

export const deleteApiAppBookById = <ThrowOnError extends boolean = false>(
  options: Options<DeleteApiAppBookByIdData, ThrowOnError>,
) => {
  return (options?.client ?? client).delete<
    DeleteApiAppBookByIdResponse,
    DeleteApiAppBookByIdError,
    ThrowOnError
  >({
    ...options,
    url: '/api/app/book/{id}',
  });
};

export const getApiAppBook = <ThrowOnError extends boolean = false>(
  options?: Options<GetApiAppBookData, ThrowOnError>,
) => {
  return (options?.client ?? client).get<
    GetApiAppBookResponse,
    GetApiAppBookError,
    ThrowOnError
  >({
    ...options,
    url: '/api/app/book',
  });
};

export const postApiAppBook = <ThrowOnError extends boolean = false>(
  options?: Options<PostApiAppBookData, ThrowOnError>,
) => {
  return (options?.client ?? client).post<
    PostApiAppBookResponse,
    PostApiAppBookError,
    ThrowOnError
  >({
    ...options,
    url: '/api/app/book',
  });
};

export const postApiAccountDynamicClaimsRefresh = <
  ThrowOnError extends boolean = false,
>(
  options?: Options<unknown, ThrowOnError>,
) => {
  return (options?.client ?? client).post<
    PostApiAccountDynamicClaimsRefreshResponse,
    PostApiAccountDynamicClaimsRefreshError,
    ThrowOnError
  >({
    ...options,
    url: '/api/account/dynamic-claims/refresh',
  });
};

export const getApiSettingManagementEmailing = <
  ThrowOnError extends boolean = false,
>(
  options?: Options<unknown, ThrowOnError>,
) => {
  return (options?.client ?? client).get<
    GetApiSettingManagementEmailingResponse,
    GetApiSettingManagementEmailingError,
    ThrowOnError
  >({
    ...options,
    url: '/api/setting-management/emailing',
  });
};

export const postApiSettingManagementEmailing = <
  ThrowOnError extends boolean = false,
>(
  options?: Options<PostApiSettingManagementEmailingData, ThrowOnError>,
) => {
  return (options?.client ?? client).post<
    PostApiSettingManagementEmailingResponse,
    PostApiSettingManagementEmailingError,
    ThrowOnError
  >({
    ...options,
    url: '/api/setting-management/emailing',
  });
};

export const postApiSettingManagementEmailingSendTestEmail = <
  ThrowOnError extends boolean = false,
>(
  options?: Options<
    PostApiSettingManagementEmailingSendTestEmailData,
    ThrowOnError
  >,
) => {
  return (options?.client ?? client).post<
    PostApiSettingManagementEmailingSendTestEmailResponse,
    PostApiSettingManagementEmailingSendTestEmailError,
    ThrowOnError
  >({
    ...options,
    url: '/api/setting-management/emailing/send-test-email',
  });
};

export const getApiFeatureManagementFeatures = <
  ThrowOnError extends boolean = false,
>(
  options?: Options<GetApiFeatureManagementFeaturesData, ThrowOnError>,
) => {
  return (options?.client ?? client).get<
    GetApiFeatureManagementFeaturesResponse,
    GetApiFeatureManagementFeaturesError,
    ThrowOnError
  >({
    ...options,
    url: '/api/feature-management/features',
  });
};

export const putApiFeatureManagementFeatures = <
  ThrowOnError extends boolean = false,
>(
  options?: Options<PutApiFeatureManagementFeaturesData, ThrowOnError>,
) => {
  return (options?.client ?? client).put<
    PutApiFeatureManagementFeaturesResponse,
    PutApiFeatureManagementFeaturesError,
    ThrowOnError
  >({
    ...options,
    url: '/api/feature-management/features',
  });
};

export const deleteApiFeatureManagementFeatures = <
  ThrowOnError extends boolean = false,
>(
  options?: Options<DeleteApiFeatureManagementFeaturesData, ThrowOnError>,
) => {
  return (options?.client ?? client).delete<
    DeleteApiFeatureManagementFeaturesResponse,
    DeleteApiFeatureManagementFeaturesError,
    ThrowOnError
  >({
    ...options,
    url: '/api/feature-management/features',
  });
};

export const postApiAccountLogin = <ThrowOnError extends boolean = false>(
  options?: Options<PostApiAccountLoginData, ThrowOnError>,
) => {
  return (options?.client ?? client).post<
    PostApiAccountLoginResponse,
    PostApiAccountLoginError,
    ThrowOnError
  >({
    ...options,
    url: '/api/account/login',
  });
};

export const getApiAccountLogout = <ThrowOnError extends boolean = false>(
  options?: Options<unknown, ThrowOnError>,
) => {
  return (options?.client ?? client).get<
    GetApiAccountLogoutResponse,
    GetApiAccountLogoutError,
    ThrowOnError
  >({
    ...options,
    url: '/api/account/logout',
  });
};

export const postApiAccountCheckPassword = <
  ThrowOnError extends boolean = false,
>(
  options?: Options<PostApiAccountCheckPasswordData, ThrowOnError>,
) => {
  return (options?.client ?? client).post<
    PostApiAccountCheckPasswordResponse,
    PostApiAccountCheckPasswordError,
    ThrowOnError
  >({
    ...options,
    url: '/api/account/check-password',
  });
};

export const getApiPermissionManagementPermissions = <
  ThrowOnError extends boolean = false,
>(
  options?: Options<GetApiPermissionManagementPermissionsData, ThrowOnError>,
) => {
  return (options?.client ?? client).get<
    GetApiPermissionManagementPermissionsResponse,
    GetApiPermissionManagementPermissionsError,
    ThrowOnError
  >({
    ...options,
    url: '/api/permission-management/permissions',
  });
};

export const putApiPermissionManagementPermissions = <
  ThrowOnError extends boolean = false,
>(
  options?: Options<PutApiPermissionManagementPermissionsData, ThrowOnError>,
) => {
  return (options?.client ?? client).put<
    PutApiPermissionManagementPermissionsResponse,
    PutApiPermissionManagementPermissionsError,
    ThrowOnError
  >({
    ...options,
    url: '/api/permission-management/permissions',
  });
};

export const getApiAccountMyProfile = <ThrowOnError extends boolean = false>(
  options?: Options<unknown, ThrowOnError>,
) => {
  return (options?.client ?? client).get<
    GetApiAccountMyProfileResponse,
    GetApiAccountMyProfileError,
    ThrowOnError
  >({
    ...options,
    url: '/api/account/my-profile',
  });
};

export const putApiAccountMyProfile = <ThrowOnError extends boolean = false>(
  options?: Options<PutApiAccountMyProfileData, ThrowOnError>,
) => {
  return (options?.client ?? client).put<
    PutApiAccountMyProfileResponse,
    PutApiAccountMyProfileError,
    ThrowOnError
  >({
    ...options,
    url: '/api/account/my-profile',
  });
};

export const postApiAccountMyProfileChangePassword = <
  ThrowOnError extends boolean = false,
>(
  options?: Options<PostApiAccountMyProfileChangePasswordData, ThrowOnError>,
) => {
  return (options?.client ?? client).post<
    PostApiAccountMyProfileChangePasswordResponse,
    PostApiAccountMyProfileChangePasswordError,
    ThrowOnError
  >({
    ...options,
    url: '/api/account/my-profile/change-password',
  });
};

export const getApiIdentityRolesAll = <ThrowOnError extends boolean = false>(
  options?: Options<unknown, ThrowOnError>,
) => {
  return (options?.client ?? client).get<
    GetApiIdentityRolesAllResponse,
    GetApiIdentityRolesAllError,
    ThrowOnError
  >({
    ...options,
    url: '/api/identity/roles/all',
  });
};

export const getApiIdentityRoles = <ThrowOnError extends boolean = false>(
  options?: Options<GetApiIdentityRolesData, ThrowOnError>,
) => {
  return (options?.client ?? client).get<
    GetApiIdentityRolesResponse,
    GetApiIdentityRolesError,
    ThrowOnError
  >({
    ...options,
    url: '/api/identity/roles',
  });
};

export const postApiIdentityRoles = <ThrowOnError extends boolean = false>(
  options?: Options<PostApiIdentityRolesData, ThrowOnError>,
) => {
  return (options?.client ?? client).post<
    PostApiIdentityRolesResponse,
    PostApiIdentityRolesError,
    ThrowOnError
  >({
    ...options,
    url: '/api/identity/roles',
  });
};

export const getApiIdentityRolesById = <ThrowOnError extends boolean = false>(
  options: Options<GetApiIdentityRolesByIdData, ThrowOnError>,
) => {
  return (options?.client ?? client).get<
    GetApiIdentityRolesByIdResponse,
    GetApiIdentityRolesByIdError,
    ThrowOnError
  >({
    ...options,
    url: '/api/identity/roles/{id}',
  });
};

export const putApiIdentityRolesById = <ThrowOnError extends boolean = false>(
  options: Options<PutApiIdentityRolesByIdData, ThrowOnError>,
) => {
  return (options?.client ?? client).put<
    PutApiIdentityRolesByIdResponse,
    PutApiIdentityRolesByIdError,
    ThrowOnError
  >({
    ...options,
    url: '/api/identity/roles/{id}',
  });
};

export const deleteApiIdentityRolesById = <
  ThrowOnError extends boolean = false,
>(
  options: Options<DeleteApiIdentityRolesByIdData, ThrowOnError>,
) => {
  return (options?.client ?? client).delete<
    DeleteApiIdentityRolesByIdResponse,
    DeleteApiIdentityRolesByIdError,
    ThrowOnError
  >({
    ...options,
    url: '/api/identity/roles/{id}',
  });
};

export const getApiMultiTenancyTenantsById = <
  ThrowOnError extends boolean = false,
>(
  options: Options<GetApiMultiTenancyTenantsByIdData, ThrowOnError>,
) => {
  return (options?.client ?? client).get<
    GetApiMultiTenancyTenantsByIdResponse,
    GetApiMultiTenancyTenantsByIdError,
    ThrowOnError
  >({
    ...options,
    url: '/api/multi-tenancy/tenants/{id}',
  });
};

export const putApiMultiTenancyTenantsById = <
  ThrowOnError extends boolean = false,
>(
  options: Options<PutApiMultiTenancyTenantsByIdData, ThrowOnError>,
) => {
  return (options?.client ?? client).put<
    PutApiMultiTenancyTenantsByIdResponse,
    PutApiMultiTenancyTenantsByIdError,
    ThrowOnError
  >({
    ...options,
    url: '/api/multi-tenancy/tenants/{id}',
  });
};

export const deleteApiMultiTenancyTenantsById = <
  ThrowOnError extends boolean = false,
>(
  options: Options<DeleteApiMultiTenancyTenantsByIdData, ThrowOnError>,
) => {
  return (options?.client ?? client).delete<
    DeleteApiMultiTenancyTenantsByIdResponse,
    DeleteApiMultiTenancyTenantsByIdError,
    ThrowOnError
  >({
    ...options,
    url: '/api/multi-tenancy/tenants/{id}',
  });
};

export const getApiMultiTenancyTenants = <ThrowOnError extends boolean = false>(
  options?: Options<GetApiMultiTenancyTenantsData, ThrowOnError>,
) => {
  return (options?.client ?? client).get<
    GetApiMultiTenancyTenantsResponse,
    GetApiMultiTenancyTenantsError,
    ThrowOnError
  >({
    ...options,
    url: '/api/multi-tenancy/tenants',
  });
};

export const postApiMultiTenancyTenants = <
  ThrowOnError extends boolean = false,
>(
  options?: Options<PostApiMultiTenancyTenantsData, ThrowOnError>,
) => {
  return (options?.client ?? client).post<
    PostApiMultiTenancyTenantsResponse,
    PostApiMultiTenancyTenantsError,
    ThrowOnError
  >({
    ...options,
    url: '/api/multi-tenancy/tenants',
  });
};

export const getApiMultiTenancyTenantsByIdDefaultConnectionString = <
  ThrowOnError extends boolean = false,
>(
  options: Options<
    GetApiMultiTenancyTenantsByIdDefaultConnectionStringData,
    ThrowOnError
  >,
) => {
  return (options?.client ?? client).get<
    GetApiMultiTenancyTenantsByIdDefaultConnectionStringResponse,
    GetApiMultiTenancyTenantsByIdDefaultConnectionStringError,
    ThrowOnError
  >({
    ...options,
    url: '/api/multi-tenancy/tenants/{id}/default-connection-string',
  });
};

export const putApiMultiTenancyTenantsByIdDefaultConnectionString = <
  ThrowOnError extends boolean = false,
>(
  options: Options<
    PutApiMultiTenancyTenantsByIdDefaultConnectionStringData,
    ThrowOnError
  >,
) => {
  return (options?.client ?? client).put<
    PutApiMultiTenancyTenantsByIdDefaultConnectionStringResponse,
    PutApiMultiTenancyTenantsByIdDefaultConnectionStringError,
    ThrowOnError
  >({
    ...options,
    url: '/api/multi-tenancy/tenants/{id}/default-connection-string',
  });
};

export const deleteApiMultiTenancyTenantsByIdDefaultConnectionString = <
  ThrowOnError extends boolean = false,
>(
  options: Options<
    DeleteApiMultiTenancyTenantsByIdDefaultConnectionStringData,
    ThrowOnError
  >,
) => {
  return (options?.client ?? client).delete<
    DeleteApiMultiTenancyTenantsByIdDefaultConnectionStringResponse,
    DeleteApiMultiTenancyTenantsByIdDefaultConnectionStringError,
    ThrowOnError
  >({
    ...options,
    url: '/api/multi-tenancy/tenants/{id}/default-connection-string',
  });
};

export const getApiSettingManagementTimezone = <
  ThrowOnError extends boolean = false,
>(
  options?: Options<unknown, ThrowOnError>,
) => {
  return (options?.client ?? client).get<
    GetApiSettingManagementTimezoneResponse,
    GetApiSettingManagementTimezoneError,
    ThrowOnError
  >({
    ...options,
    url: '/api/setting-management/timezone',
  });
};

export const postApiSettingManagementTimezone = <
  ThrowOnError extends boolean = false,
>(
  options?: Options<PostApiSettingManagementTimezoneData, ThrowOnError>,
) => {
  return (options?.client ?? client).post<
    PostApiSettingManagementTimezoneResponse,
    PostApiSettingManagementTimezoneError,
    ThrowOnError
  >({
    ...options,
    url: '/api/setting-management/timezone',
  });
};

export const getApiSettingManagementTimezoneTimezones = <
  ThrowOnError extends boolean = false,
>(
  options?: Options<unknown, ThrowOnError>,
) => {
  return (options?.client ?? client).get<
    GetApiSettingManagementTimezoneTimezonesResponse,
    GetApiSettingManagementTimezoneTimezonesError,
    ThrowOnError
  >({
    ...options,
    url: '/api/setting-management/timezone/timezones',
  });
};

export const getApiIdentityUsersById = <ThrowOnError extends boolean = false>(
  options: Options<GetApiIdentityUsersByIdData, ThrowOnError>,
) => {
  return (options?.client ?? client).get<
    GetApiIdentityUsersByIdResponse,
    GetApiIdentityUsersByIdError,
    ThrowOnError
  >({
    ...options,
    url: '/api/identity/users/{id}',
  });
};

export const putApiIdentityUsersById = <ThrowOnError extends boolean = false>(
  options: Options<PutApiIdentityUsersByIdData, ThrowOnError>,
) => {
  return (options?.client ?? client).put<
    PutApiIdentityUsersByIdResponse,
    PutApiIdentityUsersByIdError,
    ThrowOnError
  >({
    ...options,
    url: '/api/identity/users/{id}',
  });
};

export const deleteApiIdentityUsersById = <
  ThrowOnError extends boolean = false,
>(
  options: Options<DeleteApiIdentityUsersByIdData, ThrowOnError>,
) => {
  return (options?.client ?? client).delete<
    DeleteApiIdentityUsersByIdResponse,
    DeleteApiIdentityUsersByIdError,
    ThrowOnError
  >({
    ...options,
    url: '/api/identity/users/{id}',
  });
};

export const getApiIdentityUsers = <ThrowOnError extends boolean = false>(
  options?: Options<GetApiIdentityUsersData, ThrowOnError>,
) => {
  return (options?.client ?? client).get<
    GetApiIdentityUsersResponse,
    GetApiIdentityUsersError,
    ThrowOnError
  >({
    ...options,
    url: '/api/identity/users',
  });
};

export const postApiIdentityUsers = <ThrowOnError extends boolean = false>(
  options?: Options<PostApiIdentityUsersData, ThrowOnError>,
) => {
  return (options?.client ?? client).post<
    PostApiIdentityUsersResponse,
    PostApiIdentityUsersError,
    ThrowOnError
  >({
    ...options,
    url: '/api/identity/users',
  });
};

export const getApiIdentityUsersByIdRoles = <
  ThrowOnError extends boolean = false,
>(
  options: Options<GetApiIdentityUsersByIdRolesData, ThrowOnError>,
) => {
  return (options?.client ?? client).get<
    GetApiIdentityUsersByIdRolesResponse,
    GetApiIdentityUsersByIdRolesError,
    ThrowOnError
  >({
    ...options,
    url: '/api/identity/users/{id}/roles',
  });
};

export const putApiIdentityUsersByIdRoles = <
  ThrowOnError extends boolean = false,
>(
  options: Options<PutApiIdentityUsersByIdRolesData, ThrowOnError>,
) => {
  return (options?.client ?? client).put<
    PutApiIdentityUsersByIdRolesResponse,
    PutApiIdentityUsersByIdRolesError,
    ThrowOnError
  >({
    ...options,
    url: '/api/identity/users/{id}/roles',
  });
};

export const getApiIdentityUsersAssignableRoles = <
  ThrowOnError extends boolean = false,
>(
  options?: Options<unknown, ThrowOnError>,
) => {
  return (options?.client ?? client).get<
    GetApiIdentityUsersAssignableRolesResponse,
    GetApiIdentityUsersAssignableRolesError,
    ThrowOnError
  >({
    ...options,
    url: '/api/identity/users/assignable-roles',
  });
};

export const getApiIdentityUsersByUsernameByUserName = <
  ThrowOnError extends boolean = false,
>(
  options: Options<GetApiIdentityUsersByUsernameByUserNameData, ThrowOnError>,
) => {
  return (options?.client ?? client).get<
    GetApiIdentityUsersByUsernameByUserNameResponse,
    GetApiIdentityUsersByUsernameByUserNameError,
    ThrowOnError
  >({
    ...options,
    url: '/api/identity/users/by-username/{userName}',
  });
};

export const getApiIdentityUsersByEmailByEmail = <
  ThrowOnError extends boolean = false,
>(
  options: Options<GetApiIdentityUsersByEmailByEmailData, ThrowOnError>,
) => {
  return (options?.client ?? client).get<
    GetApiIdentityUsersByEmailByEmailResponse,
    GetApiIdentityUsersByEmailByEmailError,
    ThrowOnError
  >({
    ...options,
    url: '/api/identity/users/by-email/{email}',
  });
};

export const getApiIdentityUsersLookupById = <
  ThrowOnError extends boolean = false,
>(
  options: Options<GetApiIdentityUsersLookupByIdData, ThrowOnError>,
) => {
  return (options?.client ?? client).get<
    GetApiIdentityUsersLookupByIdResponse,
    GetApiIdentityUsersLookupByIdError,
    ThrowOnError
  >({
    ...options,
    url: '/api/identity/users/lookup/{id}',
  });
};

export const getApiIdentityUsersLookupByUsernameByUserName = <
  ThrowOnError extends boolean = false,
>(
  options: Options<
    GetApiIdentityUsersLookupByUsernameByUserNameData,
    ThrowOnError
  >,
) => {
  return (options?.client ?? client).get<
    GetApiIdentityUsersLookupByUsernameByUserNameResponse,
    GetApiIdentityUsersLookupByUsernameByUserNameError,
    ThrowOnError
  >({
    ...options,
    url: '/api/identity/users/lookup/by-username/{userName}',
  });
};

export const getApiIdentityUsersLookupSearch = <
  ThrowOnError extends boolean = false,
>(
  options?: Options<GetApiIdentityUsersLookupSearchData, ThrowOnError>,
) => {
  return (options?.client ?? client).get<
    GetApiIdentityUsersLookupSearchResponse,
    GetApiIdentityUsersLookupSearchError,
    ThrowOnError
  >({
    ...options,
    url: '/api/identity/users/lookup/search',
  });
};

export const getApiIdentityUsersLookupCount = <
  ThrowOnError extends boolean = false,
>(
  options?: Options<GetApiIdentityUsersLookupCountData, ThrowOnError>,
) => {
  return (options?.client ?? client).get<
    GetApiIdentityUsersLookupCountResponse,
    GetApiIdentityUsersLookupCountError,
    ThrowOnError
  >({
    ...options,
    url: '/api/identity/users/lookup/count',
  });
};
