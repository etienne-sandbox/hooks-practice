import { useEffect, useMemo, useState } from "react";
import { Me, getMe } from "../logic/api";

type AuthResult = {
  token: string | null;
  loading: boolean;
  user: null | Me;
  setToken: (token: string | null) => void;
};

export function useAuth() {
  const [token, setToken] = useState<string | null>(null);
  const [meUser, setMeUser] = useState<Me | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token === null) {
      return;
    }
    setLoading(true);
    let cancelled = false;
    getMe(token)
      .then((user) => {
        if (cancelled) {
          return;
        }
        setLoading(false);
        setMeUser(user);
      })
      .catch(() => {
        if (cancelled) {
          return;
        }
        setLoading(false);
        setToken(null);
        setMeUser(null);
      });
    return () => {
      cancelled = true;
    };
  }, [token]);

  const result = useMemo(
    (): AuthResult => ({
      user: meUser,
      setToken: (token) => {
        setToken(token);
        if (token === null) {
          setMeUser(null);
        }
      },
      token,
      loading,
    }),
    [loading, meUser, token]
  );

  return result;
}
