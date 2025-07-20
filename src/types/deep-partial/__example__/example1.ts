import { useState } from "react";
import DeepPartial from "../deep-partial";

type User = {
  name: string;
  age: number;
  notification: {
    email: boolean;
    push: boolean;
  };
};

const useUser = () => {
  const [user, setUser] = useState<User>({
    name: "Alice",
    age: 25,
    notification: {
      email: true,
      push: false,
    },
  });
  
  // Updating user in regular way
  // Props: Simple implementation
  // Cons: Calling method need to constructure the whole user object
  const updateUserRegular = (newUser: User) => {
    setUser(newUser);
  };

  // Using updateUser1 requires full user object
  updateUserRegular({ name: "Bob", age: 30, notification: { email: false, push: true } });

  // Updating user with Partial type
  // Props: Allows partial updates, easier to work with
  // Cons: Need to Construct the object for nested properties
  //       like notification, which is not ideal 
  const updateUserPartial = (newUser: Partial<User>) => {
    setUser((prevUser) => ({
      ...prevUser,
      ...newUser,
      notification: {
        ...prevUser.notification,
        ...newUser.notification,
      },
    }));
  };


  // Using updateUser2 allows partial updates
  updateUserPartial({ age: 31 });
  // But using partial type requires adding the whole notification object
  updateUserPartial({ notification: { email: false, push: false } });


  // Updating user with DeepPartial type
  const updateUserDeepPartial = (newUser: DeepPartial<User>) => {
    setUser((prevUser) => ({
      ...prevUser,
      ...(newUser ?? {}),
      notification: {
        ...prevUser.notification,
        ...(newUser.notification ?? {}),
      },
    }));
  };


  // Using updateUser3 allows deep partial updates
  // This allows updating only the push notification setting
  // without needing to specify the entire notification object
  updateUserDeepPartial({ notification: { push: true } });

  return {
    user,
    updateUserRegular,
    updateUserPartial,
    updateUserDeepPartial,
  };
};


const UserComponent = () => {
  const { user, updateUserRegular, updateUserPartial, updateUserDeepPartial } = useUser();

  // Example usage of update methods
  const handleUpdate = () => {
    // Using updateUser1 requires full user object
    updateUserRegular({ name: "Bob", age: 30, notification: { email: false, push: true } });

    // Using updateUser2 allows partial updates
    updateUserPartial({ age: 31 });
    // But using partial type requires adding the whole notification object
    updateUserPartial({ notification: { email: false, push: false } });

    // Using updateUser3 allows deep partial updates
    updateUserDeepPartial({ notification: { push: true } });
  };

  return null;
};