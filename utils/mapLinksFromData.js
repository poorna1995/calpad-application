const mapLinksFromData = (data, urlPrefix) => {
  const links = Object.keys(data).map((item, index) => {
    return {
      id: index,
      title: data[item].title,
      url: `/${urlPrefix}/${item}`,
    };
  });
  return links;
};

export default mapLinksFromData;
