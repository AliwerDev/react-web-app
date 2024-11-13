import React, { useCallback, useEffect } from "react";
import useWebApp from "./use-webapp";

type IProps = {
  text: string;
  disabled?: boolean;
  onClick?: () => void;
  ref?: React.RefObject<any>;
};

const useMainButton = ({ ref, text, disabled, onClick }: IProps) => {
  const webapp = useWebApp();

  useEffect(() => {
    webapp.MainButton.text = text;
    webapp.MainButton.onClick(() => {
      if (onClick) onClick();
      if (ref) ref.current?.click();
    });
    webapp.MainButton.show();
    webapp.MainButton.enable();
  }, [onClick, ref, text, webapp]);

  useEffect(() => {
    if (disabled) webapp.MainButton.disable();
    else webapp.MainButton.enable();
  }, [disabled, webapp]);

  const handleShow = useCallback(() => {
    webapp.MainButton.enable();
    webapp.MainButton.show();
  }, [webapp]);

  const handleHide = useCallback(() => {
    webapp.MainButton.disable();
    webapp.MainButton.hide();
  }, [webapp]);

  const toggleProgress = useCallback(
    (isTrue: boolean) => {
      if (isTrue) webapp.MainButton.showProgress();
      else webapp.MainButton.hideProgress();
    },
    [webapp]
  );

  return { toggleProgress, handleHide, handleShow };
};

export default useMainButton;
