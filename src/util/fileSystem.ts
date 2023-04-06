import FileSaver from 'file-saver';

function save(fileName:string, fileType: string, fileContents:string) {
  const blob = new Blob([fileContents], { type: fileType });
  FileSaver.saveAs(blob, fileName);
}

function load(fileName:Blob) {
  const reader = new FileReader();

  return new Promise((resolve) => {
    reader.addEventListener('loadend', (e) => {
      resolve(e.target?.result);
      // NOTE: test this, comment below is deprecated
      // resolve(e.srcElement.result);
    });
    reader.readAsText(fileName);
  });
}

function isSaveSupported() {
  try {
    return !!new Blob();
  } catch (e) {
    return false;
  }
}

export default { save, load, isSaveSupported };
