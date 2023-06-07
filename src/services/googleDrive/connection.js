import { useEffect } from "react";
import useDrivePicker from "react-google-drive-picker/dist";

export default function Connection() {
  const [openPicker, data, authResponse] = useDrivePicker();
  openPicker({
    clientId:
      "212802765276-jb56k9ehlhojvv0kqa9s2i9btq1d2dc8.apps.googleusercontent.com",
    developerKey: "AIzaSyB5-i83jDAu5FkVgU41C3fAz2p6VhFGm0E",
    viewId: "DOCS",
    token:
      "ya29.a0AWY7CkkVjbwf4Z1-bRNaC7M0zl-NMjzegq9rDc826Z4i7rY0s3rkdwa7x95YEHnVnbnBPZ4tnLxKhv_i3UfT8e3AQBAyP-FXeJvldsfGL6vPFs6isUCNmgobrdUnD2NuARtt31gnx55N9DLzhpDMenYzi853aCgYKAdgSARISFQG1tDrpC-WvaFDfTvZqhRSFPfeeTQ0163",
    showUploadFolders: true,
    supportDrives: true,
    multiselect: false,
  });
  useEffect(() => {
    data.docs.map((i) => console.log(i));
  }, [data]);
}
