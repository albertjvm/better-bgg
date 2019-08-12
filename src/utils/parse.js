import he from 'he';

function parse (xml) {
  const doc = typeof xml === 'string' 
    ? (new window.DOMParser()).parseFromString(xml, "text/xml")
    : xml;
  const json = [...doc.children].map(parseEl);

  return Array.isArray(json) && json.length === 1 ? json[0] : json;
}

function parseEl (el) {
  return {
    [el.tagName]: !!el.innerHTML && el.children.length === 0 
      ? he.decode(el.textContent)
      : {
        ...Object.keys(el.attributes).reduce((acc, i) => ({
          ...acc,
          [el.attributes[i].name]: el.attributes[i].value
        }), {}),
        ...[...el.children]
          .map(child => ({
            tagName: child.tagName,
            parsedChild: parseEl(child)
          }))
          .reduce((acc, {tagName, parsedChild}, index, parsedChildren) => {
            if (parsedChildren.filter(pc => pc.tagName === tagName).length > 1) {
              const key = tagName.endsWith('s') ? tagName : `${tagName}s`;
              return {
                ...acc,
                [key]: [
                  ...(acc[key] || []),
                  parsedChild[tagName],
                ]
              }
            } else {
              return {
                ...acc,
                ...parsedChild,
              };
            }
          }, {}),
        },
  };
}

export { parse };
