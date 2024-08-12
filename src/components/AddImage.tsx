import { ChangeEventHandler } from 'react';
import { useSetRecoilState } from 'recoil';
import { imageStates } from '../states';
import TodoService from '../services/TodoService';

export default function AddImage() {
  const todoService = TodoService.getInstance();
  const setImages = useSetRecoilState(imageStates);

  const handleChangeFile: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (!e.target.files) {
      return;
    }
    const file = e.target.files[0];
    todoService
      .uploadFile(file)
      .then(async (result) => {
        console.log('Success to upload your file', result);
        const urls = await todoService.getImages();

        setImages(urls);
      })
      .catch((err) => {
        console.log('Can not upload a file', err);
      });
  };

  return (
    <div>
      <input type='file' onChange={handleChangeFile} />
      <label>파일 업로드</label>
    </div>
  );
}
