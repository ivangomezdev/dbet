"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import UserEditForm from "../../components/UserEditForm";
import NavBar from "@/components/NavBar";
import "./mePage.css";
import { useSession } from "next-auth/react";


// Example of initial data you could pass to the component
const userData = {
  name: "Ella",
  surname: "Lauda",
  email: "ella@site.com",
  phone: "+1(609) 972-22-22",
  phoneType: "Mobile",
  organization: "Htmlstream",
  department: "Your department",
  profileImage: "/placeholder.svg?height=100&width=100",
  // You could also pass a banner image URL
};

const Page = () => {  

  const { data: session, status } = useSession();
  const [cookies] = useCookies(["token"]); // Leer las cookies
  const router = useRouter();

  console.log(status);
  
  useEffect(() => {
    if (status === "loading") return;

    if (status === "unauthenticated" && !cookies.token) {
      router.push("/auth/register");
    }
  }, [status, cookies.token, router]);

  return (
    <div>
      <NavBar />
      <div className="me__content">
        <UserEditForm initialData={userData} />
      </div>
    </div>
  );
};

export default Page;
