"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Button } from "./ui/button";
import {
  usePlaidLink,
  PlaidLinkOptions,
  PlaidLinkOnSuccess,
} from "react-plaid-link";
import { date } from "zod";
import { useRouter } from "next/navigation";
import {
  createLinkToken,
  exchangePublicToken,
} from "@/lib/actions/user.action";
import Image from "next/image";
const PlaidLink = ({ user, variant }: PlaidLinkProps) => {
  const router = useRouter();
  const [token, settoken] = useState("");
  const onSuccess = useCallback<PlaidLinkOnSuccess>(
    async (public_token: string) => {
      await exchangePublicToken({
        publicToken: public_token,
        user,
      });
      router.push("/");
    },
    [user]
  );
  const config: PlaidLinkOptions = {
    token,
    onSuccess,
  };

  const { open, ready } = usePlaidLink(config);

  useEffect(() => {
    const getLinkToken = async () => {
      const data = await createLinkToken(user);
      settoken(data?.linkToken);
    };
    getLinkToken();
  }, [user]);

  return (
    <>
      {variant === "primary" ? (
        <Button
          className="plaidlink-primary"
          onClick={() => open()}
          disabled={!ready}
        >
          Connect Bank
        </Button>
      ) : variant === "ghost" ? (
        <Button
          variant={"ghost"}
          onClick={() => open()}
          className="plaidlink-ghost "
        >
          <Image
            src={"/icons/connect-bank.svg"}
            alt="connect bank"
            height={24}
            width={24}
          />
          <p className="hiddenl xl:block text-[16px] font-semibold text-black-2">
            Connect Bank
          </p>
        </Button>
      ) : variant === "home" ? (
        <div
          // variant={"default"}
          onClick={() => open()}
          className="plaidlink-default "
        >
          <Image src={"/icons/plus.svg"} height={20} width={20} alt="plus" />
          <h2 className="text-14 font-semibold text-gray-600">Add Bank</h2>
        </div>
      ) : (
        <Button onClick={() => open()} className="plaidlink-default ">
          <Image
            src={"/icons/connect-bank.svg"}
            alt="connect bank"
            height={24}
            width={24}
          />
          <p className="hidden xl:block text-[16px] font-semibold text-black-2">
            Connect Bank
          </p>
        </Button>
      )}
    </>
  );
};

export default PlaidLink;
