export const addItemToServer = async (userId, title, body, reactions, tags) => {
  const response = await fetch('http://localhost:3000/api/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ userId, title, body, reactions, tags })
  });

  if (!response.ok) {
    throw new Error('Failed to add item');
  }

  const data = await response.json();
  console.log("Server Response for Added Item", data);
  return mapServerItemToLocalItem(data);
};

export const getItemsFromServer = async () => {
  const response = await fetch('http://localhost:3000/api/posts');
  if (!response.ok) {
    throw new Error('Failed to fetch items');
  }

  const data = await response.json();
  return data.map(mapServerItemToLocalItem);
};

export const deleteItemFromServer = async (id) => {
  const response = await fetch(`http://localhost:3000/api/posts/${id}`, {
    method: 'DELETE'
  });

  if (!response.ok) {
    throw new Error('Failed to delete item');
  }

  const deletedItem = await response.json();
  console.log("Server Response for Deleted Item", deletedItem);

  return deletedItem._id || deletedItem.id;
};

const mapServerItemToLocalItem = (serverItem) => {
  return {
    id: serverItem?.id || serverItem?._id,
    userId: serverItem.userId,
    title: serverItem.title,
    body: serverItem.body,
    reactions: serverItem.reactions,
    tags: serverItem.tags
  };
};