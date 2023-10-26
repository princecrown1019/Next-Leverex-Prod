import { UPLOAD_API_URL } from '~/constants/configConstants';

type UploadCorporateData = {
  onboardingData: File;
  coiData: File;
  otherData?: null | File;
};

export const uploadCorporateData = async (accessToken: string, data: UploadCorporateData) => {
  const formData = new FormData();
  formData.append('onboarding_data', data.onboardingData);
  formData.append('coi_data', data.coiData);

  if (data.otherData) {
    formData.append('other_data', data.otherData);
  }

  const res = await fetch(UPLOAD_API_URL, {
    method: 'post',
    headers: { Authorization: accessToken },
    body: formData
  });

  return res.json();
};
