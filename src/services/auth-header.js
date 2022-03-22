export default function authHeader() {
    const user = JSON.parse(localStorage.getItem('userToken'));
    // console.log(user);
    if (user) {
      return { Authorization: 'Bearer ' + user }; // for Spring Boot back-end
    } else {
      return {};
    }
}