import FileIconMapper from '@/utils/FileIconMapper';

export default class FileC {
  constructor(url, hash, file) {
    this.modified = Date.now();
    this.url = url;
    this.hash = hash;
    this.filename = file.name;
    this.size = file.size;
    this.type = file.type;
  }

  getFileIcon() {
    return FileIconMapper.translateFiletype(this.type, FileIconMapper.mappings);
  }

  getObject() {
    return {
      url: this.url,
      hash: this.hash,
      type: this.type,
      size: this.size,
      filename: this.filename,
      at: this.modified,
    };
  }
}
