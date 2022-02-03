import { useCallback, useDebugValue, useEffect, useRef, useState } from "react";

type Resource<T> =
  | { status: "pending" }
  | { status: "resolved"; data: T; update: () => void; updating: boolean }
  | { status: "rejected"; error: unknown };

function useLatestRef<T>(val: T): React.MutableRefObject<T> {
  const ref = useRef(val);
  useEffect(() => {
    ref.current = val;
  }, [val]);
  return ref;
}

type CleanupFn = () => void;

export function useQuery<T>(fn: () => Promise<T>): Resource<T> {
  const [resourse, setResource] = useState<Resource<T>>({ status: "pending" });

  const fnRef = useLatestRef(fn);

  useDebugValue(resourse, (res) =>
    res.status === "resolved"
      ? `resolved` + (res.updating ? "(updating)" : "")
      : res.status
  );

  const update = useCallback((): CleanupFn => {
    setResource((prev) => {
      if (prev.status === "resolved") {
        return { ...prev, updating: true };
      }
      if (prev.status === "pending") {
        return prev;
      }
      return { status: "pending" };
    });
    let canceled = false;
    fnRef
      .current()
      .then((data) => {
        if (canceled) {
          console.log("Success Canceled");
          return;
        }
        setResource({ status: "resolved", data, update, updating: false });
      })
      .catch((error) => {
        if (canceled) {
          console.log("Error Canceled");
          return;
        }
        setResource({ status: "rejected", error });
      });
    return () => {
      canceled = true;
    };
  }, [fnRef]);

  useEffect(() => {
    return update();
  }, [update]);

  return resourse;
}
