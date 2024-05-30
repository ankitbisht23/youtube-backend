function extractPublicIdFromUrl(url) {
    // Split the URL by '/' to get an array of path segments
    const pathSegments = url.split('/');
  
    // The public ID is the last segment of the path
    const publicId = pathSegments.pop();
  
    // Remove the file extension from the public ID
    const publicIdWithoutExtension = publicId.split('.')[0];
  
    return publicIdWithoutExtension;
  }

export {extractPublicIdFromUrl}