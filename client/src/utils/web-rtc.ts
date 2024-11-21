type TGetUserMedia = (params: {
  audio: boolean;
  video: boolean;
}) => Promise<MediaStream>;

export const getUserMedia: TGetUserMedia = (params) => {
  return navigator.mediaDevices.getUserMedia({
    ...params,
  });
};
