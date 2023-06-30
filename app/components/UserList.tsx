"use client";
import { useEffect, useState } from "react";

export default function UserList() {
  const [users, setUsers] = useState<{ id: number; name: string }[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    fetch("http://localhost:3000/api/users")
      //IF WE WANT THE PROMISE TO BE WAITED BY THE CODE IN .THEN, WE NEED TO RETURN IT
      .then((res) => {
        //RETURN RES.JSON() PROMISE TO LET THE NEXT THEN WAIT FOR IT
        //THE NEXT THEN WILL GET THE RESOLVED DATA
        return res.json();
      })
      .then((data) => {
        //RETURN THIS PROMISE TO MAKE TO NEXT THEN WAIT FOR IT
        return new Promise((resolve) => {
          setTimeout(() => {
            setUsers(data);
            resolve(data);
          }, 2000);
        });
      })
      .then((data) => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <ul>
      {users &&
        users.length > 0 &&
        users.map((user, index) => (
          <li key={index}>
            <p>id:{user.id}</p>
            <p>name:{user.name}</p>
          </li>
        ))}
    </ul>
  );
}
