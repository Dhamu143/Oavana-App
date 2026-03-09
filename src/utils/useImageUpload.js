import { useState } from 'react';
import { launchImageLibrary } from 'react-native-image-picker';
import apiClient from './ApiClient';


const useImageUpload = () => {
  const [loading, setLoading] = useState(false);
  const [modalData, setModalData] = useState({
    visible: false,
    message: '',
    success: false,
  });

  const selectImage = async onSuccess => {
    const options = {
      mediaType: 'photo',
      quality: 0.5,
    };

    launchImageLibrary(options, async response => {
      if (response.didCancel) return;

      if (response.errorMessage) {
        showModal('Image Picker Error', false);
        return;
      }

      if (response.assets && response.assets.length > 0) {
        const asset = response.assets[0];

        const imageFile = {
          uri: asset.uri,
          type: asset.type || 'image/jpeg',
          name: asset.fileName || 'profile.jpg',
        };

        uploadImage(imageFile, onSuccess);
      }
    });
  };

  const uploadImage = async (imageFile, onSuccess) => {
    setLoading(true);

    const formData = new FormData();
    formData.append('image', imageFile);

    try {
      const response = await apiClient.post(
        '/upload/profileimage',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      if (response.data.success) {

        if (onSuccess) {
          onSuccess(response?.data?.data?.data?.file);
        }

      } else {
        showModal('Profile Picture Upload Failed', false);
      }
    } catch (error) {
      showModal('Profile Picture Upload Failed', false);
    } finally {
      setLoading(false);
    }
  };

  const showModal = (message, success) => {
    setModalData({
      visible: true,
      message,
      success,
    });
  };

  const closeModal = () => {
    setModalData({ ...modalData, visible: false });
  };

  const showModalMessage = (message, success) => {
  setModalData({
    visible: true,
    message,
    success,
  });
};

return {
  selectImage,
  loading,
  modalData,
  closeModal,
  showModalMessage
};
};

export default useImageUpload;