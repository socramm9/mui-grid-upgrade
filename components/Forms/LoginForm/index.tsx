import {
  Button,
  Collapse,
  Container,
  Grid,
  makeStyles,
  TextField,
} from "@material-ui/core";
import useTranslation from "next-translate/useTranslation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { PasswordField } from "./PasswordField";

export interface LoginFormProps {
  onSubmit?: (result: LoginFormResult) => void;
  onForgotPassword?: (user: string) => void;
}

export interface LoginFormResult {
  user: string;
  password: string;
  //stayLogedIn: boolean;
}

export const LoginForm: React.FC<LoginFormProps> = (props) => {
  const { t } = useTranslation("login");
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<LoginFormResult>();
  const classes = useStyles();
  const [forgotPassword, setForgotPassword] = useState(false);

  const { ref: refUsername, ...inputPropsUser } = register("user", {
    required: true,
  });
  const { ref: refPassword, ...inputPropsPassword } = register("password", {
    required: true,
  });

  const onSubmit = (data: any) => props.onSubmit && props.onSubmit(data);

  return (
    <Container maxWidth={false}>
      <Grid container direction="column" spacing={1}>
        <Grid item>
          <TextField
            autoFocus
            error={errors.user !== undefined}
            label={t("customer-number")}
            variant="outlined"
            fullWidth
            inputRef={refUsername}
            {...inputPropsUser}
          />
        </Grid>
        <Grid item>
          <Collapse in={!forgotPassword}>
            <PasswordField
              label={t("password")}
              helperText=" "
              error={errors.password !== undefined}
              inputRef={refPassword}
              onEnterPress={() => handleSubmit(onSubmit)()}
              {...inputPropsPassword}
            />
          </Collapse>
        </Grid>
        {/* <Grid item>
          <FormControlLabel
          control={<Checkbox color="primary" />}
          label={t("stay-signed-in")}
          />
        </Grid> */}
        <Grid item className={classes.paddingTop}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={
              forgotPassword
                ? () => props.onForgotPassword(getValues("user"))
                : handleSubmit(onSubmit)
            }>
            {forgotPassword ? t("resetPassword") : t("log-in")}
          </Button>
        </Grid>
        <Grid item>
          <Button
            onClick={() => {
              setForgotPassword(!forgotPassword);
            }}>
            {forgotPassword ? t("log-in") : t("problem-logging-in")}
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

const useStyles = makeStyles((theme) => ({
  paddingTop: {
    marginTop: theme.spacing(1),
  },
}));
