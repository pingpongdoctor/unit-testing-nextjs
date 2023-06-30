"use client";

interface Props {
  name: string;
  age: number;
  isVip: boolean;
}

export default function UserProfile({ name, age, isVip }: Props) {
  return (
    <div>
      <p>
        name:
        {name.split("").length > 30
          ? name.split("").slice(0, 30).join("").concat("...")
          : name}
      </p>
      <p>age:{age}</p>
      <p>isVip:{isVip ? "vip" : "no vip"}</p>
    </div>
  );
}
