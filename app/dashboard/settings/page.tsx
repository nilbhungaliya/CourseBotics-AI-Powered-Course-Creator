"use client";

import { useSession } from "next-auth/react";
import { PageTransition } from "@/components/ui/page-transition";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { toast } from "sonner";
import {
  updateUserSettings,
  changeEmail,
  changePassword,
} from "@/app/_actions/settings";
import { Separator } from "@/components/ui/separator";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { Eye, EyeOff } from "lucide-react";

export default function SettingsPage() {
  const { data: session, update } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [errorName, setErrorName] = useState<string | undefined>();
  const [errorEmail, setErrorEmail] = useState<string | undefined>();
  const [errorPassword, setErrorPassword] = useState<string | undefined>();
  const [successName, setSuccessName] = useState<string | undefined>();
  const [successEmail, setSuccessEmail] = useState<string | undefined>();
  const [successPassword, setSuccessPassword] = useState<string | undefined>();
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: session?.user?.name || "",
    isTwoFactorEnabled: session?.user?.isTwoFactorEnabled || false,
  });
  const [emailData, setEmailData] = useState({
    email: "",
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
  });

  // Check if user is using OAuth provider
  const isOAuthUser = session?.user?.provider === "google" || session?.user?.provider === "github";

  if (!session?.user) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorName(undefined);
    setSuccessName(undefined);

    try {
      const result = await updateUserSettings(formData);
      if (result.error) {
        setErrorName(result.error);
        toast.error(result.error);
      } else {
        setSuccessName("Settings updated successfully");
        toast.success("Settings updated successfully");
        await update(); // Update the session with new data
      }
    } catch (error) {
      setErrorName("Something went wrong");
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorEmail(undefined);
    setSuccessEmail(undefined);

    try {
      const result = await changeEmail(emailData);
      if (result.error) {
        setErrorEmail(result.error);
        toast.error(result.error);
      } else {
        setSuccessEmail("Verification email sent. Please check your inbox.");
        toast.success("Verification email sent. Please check your inbox.");
        setEmailData({ email: "" });
        await update(); // Update session after email change
      }
    } catch (error) {
      setErrorEmail("Something went wrong");
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorPassword(undefined);
    setSuccessPassword(undefined);

    try {
      const result = await changePassword(passwordData);
      if (result.error) {
        setErrorPassword(result.error);
        toast.error(result.error);
      } else {
        setSuccessPassword("Password updated successfully");
        toast.success("Password updated successfully");
        setPasswordData({ currentPassword: "", newPassword: "" });
        await update(); // Update session after password change
      }
    } catch (error) {
      setErrorPassword("Something went wrong");
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageTransition className="container max-w-4xl py-10">
      <h1 className="text-4xl font-bold text-center mb-8">Settings</h1>

      <div className="space-y-6">
        {/* Profile Settings */}
        <form onSubmit={handleSubmit} noValidate>
          <Card>
            <CardHeader>
              <CardTitle>Profile Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Your name"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Two-Factor Authentication</Label>
                  <p className="text-sm text-muted-foreground">
                    Add an extra layer of security to your account
                  </p>
                </div>
                <Switch
                  disabled={isOAuthUser}
                  checked={formData.isTwoFactorEnabled}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, isTwoFactorEnabled: checked })
                  }
                />
              </div>

              {errorName && <FormError message={errorName} />}
              {successName && <FormSuccess message={successName} />}

              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </CardContent>
          </Card>
        </form>

        <Separator />

        {/* Email Change */}
        <form onSubmit={handleEmailChange} noValidate>
          <Card>
            <CardHeader>
              <CardTitle>Change Email</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">New Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={emailData.email}
                  onChange={(e) => setEmailData({ email: e.target.value })}
                  placeholder="Enter new email address"
                  disabled={isOAuthUser}
                />
                {isOAuthUser && (
                  <p className="text-sm text-muted-foreground">
                    Email cannot be changed for {session.user.provider} accounts
                  </p>
                )}
              </div>

              {errorEmail && <FormError message={errorEmail} />}
              {successEmail && <FormSuccess message={successEmail} />}

              <Button type="submit" disabled={isLoading || isOAuthUser}>
                {isLoading ? "Sending..." : "Send Verification Email"}
              </Button>
            </CardContent>
          </Card>
        </form>

        <Separator />

        {/* Password Change */}
        <form onSubmit={handlePasswordChange} noValidate>
          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <div className="relative">
                  <Input
                    id="currentPassword"
                    type={showCurrentPassword ? "text" : "password"}
                    value={passwordData.currentPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        currentPassword: e.target.value,
                      })
                    }
                    placeholder="Enter current password"
                    disabled={isOAuthUser}
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                    disabled={isOAuthUser}
                  >
                    {showCurrentPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {isOAuthUser && (
                  <p className="text-sm text-muted-foreground">
                    Password cannot be changed for {session.user.provider} accounts
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <div className="relative">
                  <Input
                    id="newPassword"
                    type={showNewPassword ? "text" : "password"}
                    value={passwordData.newPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        newPassword: e.target.value,
                      })
                    }
                    placeholder="Enter new password"
                    disabled={isOAuthUser}
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                    disabled={isOAuthUser}
                  >
                    {showNewPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {errorPassword && <FormError message={errorPassword} />}
              {successPassword && <FormSuccess message={successPassword} />}

              <Button type="submit" disabled={isLoading || isOAuthUser}>
                {isLoading ? "Updating..." : "Update Password"}
              </Button>
            </CardContent>
          </Card>
        </form>
      </div>
    </PageTransition>
  );
}
