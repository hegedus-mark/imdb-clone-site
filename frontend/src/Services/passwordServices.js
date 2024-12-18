export const changePassword = async (newPassword, currentPassword, userId, token) => {

  const response = await fetch(`/api/user/${userId}/change-password`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ newPassword: newPassword, currentPassword: currentPassword }),
  });
  return response;

}
