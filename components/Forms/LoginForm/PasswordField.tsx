import { useState } from "react";
import { TextField, InputAdornment, IconButton } from "@material-ui/core/";
import { VisibilityOff, Visibility } from "@material-ui/icons";

export interface PasswordFieldProps {
  id?: string;
  className?: string;
  label: string;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
  inputRef?: React.Ref<any>;
  disablePasswordVisibility?: boolean;
  name?: string;
  onChange?:
    | React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>
    | undefined;
  onBlur?:
    | React.FocusEventHandler<HTMLTextAreaElement | HTMLInputElement>
    | undefined;
  onEnterPress?: () => void;
}

export function PasswordField(props: PasswordFieldProps): JSX.Element {
  const [showPassword, setShowPassword] = useState(false);
  const {
    id,
    className,
    disabled,
    error,
    helperText,
    onEnterPress,
    onChange,
    onBlur,
    disablePasswordVisibility,
    inputRef,
    label,
    name,
  } = props;

  return (
    <TextField
      id={id}
      className={className}
      label={label}
      type={showPassword ? "text" : "password"}
      variant="outlined"
      error={error}
      name={name}
      helperText={helperText}
      inputRef={inputRef}
      onChange={onChange}
      onBlur={onBlur}
      onKeyDown={(event) => {
        if (event.key === "Enter") onEnterPress && onEnterPress();
      }}
      disabled={disabled}
      fullWidth
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            {!disablePasswordVisibility ? (
              <IconButton
                edge="end"
                aria-label="Toggle password visibility"
                onClick={() => setShowPassword(!showPassword)}>
                {!showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            ) : (
              <></>
            )}
          </InputAdornment>
        ),
      }}
    />
  );
}
