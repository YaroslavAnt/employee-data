export default function ContactList() {
  const users = [];
  for (let index = 0; index < 26; index++) {
    users.push({
      name: `Deontae Dare${index}`,
      dateOfBirth: `200${index}-${index}-${index}`,
      vacation: `manager${index}`,
      salary: 1000 + index,
      img: 'https://s3.amazonaws.com/uifaces/faces/twitter/andysolomon/128.jpg',
    });
  }
  return users;
}
