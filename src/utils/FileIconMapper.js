export default {
  mappings: {
    default: 'fas fa-file',
    md: 'fab fa-markdown',
    'image/': 'fas fa-images',
    'audio/': 'fas fa-file-audio',
    'video/': 'fas fa-file-video',
    'application/': 'fas fa-archive',
    'application/json': 'fas fa-file-code',
    'application/zip': 'fas fa-file-archive',
    'application/x-javascript': 'fab fa-js-square',
    'application/java-archive': 'fab fa-java',
    'text/css': 'fab fa-css3-alt',
  },
  translateFiletype(filetype, mappings) {
    let classname = mappings.default;
    // eslint-disable-next-line
    for (const [key] of Object.entries(mappings)) {
      if (filetype.includes(key)) {
        classname = mappings[key];
      }
    }
    return classname;
  },
};
