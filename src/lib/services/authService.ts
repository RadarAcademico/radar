import { supabase } from "@/lib/supabase";
import { User, Session } from "@supabase/supabase-js";

export interface AuthError {
  message: string;
  code?: string;
}

export interface AuthResult {
  success: boolean;
  error?: AuthError;
  user?: User;
  session?: Session;
}

export class AuthService {
  /**
   * Realiza login do usuário
   */
  static async signIn(email: string, password: string): Promise<AuthResult> {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return {
          success: false,
          error: {
            message: error.message,
            code: error.status?.toString(),
          },
        };
      }

      return {
        success: true,
        user: data.user,
        session: data.session,
      };
    } catch (error) {
      return {
        success: false,
        error: {
          message: "Erro inesperado durante o login",
        },
      };
    }
  }

  /**
   * Registra novo usuário
   */
  static async signUp(email: string, password: string): Promise<AuthResult> {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        return {
          success: false,
          error: {
            message: error.message,
            code: error.status?.toString(),
          },
        };
      }

      return {
        success: true,
        user: data.user || undefined,
        session: data.session || undefined,
      };
    } catch (error) {
      return {
        success: false,
        error: {
          message: "Erro inesperado durante o registro",
        },
      };
    }
  }

  /**
   * Realiza logout do usuário
   */
  static async signOut(): Promise<AuthResult> {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        return {
          success: false,
          error: {
            message: error.message,
            code: error.status?.toString(),
          },
        };
      }

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: {
          message: "Erro inesperado durante o logout",
        },
      };
    }
  }

  /**
   * Obtém a sessão atual
   */
  static async getSession(): Promise<AuthResult> {
    try {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        return {
          success: false,
          error: {
            message: error.message,
            code: error.status?.toString(),
          },
        };
      }

      return {
        success: true,
        user: data.session?.user,
        session: data.session || undefined,
      };
    } catch (error) {
      return {
        success: false,
        error: {
          message: "Erro ao obter sessão",
        },
      };
    }
  }

  /**
   * Atualiza dados do usuário
   */
  static async updateProfile(updates: {
    email?: string;
    password?: string;
    data?: any;
  }): Promise<AuthResult> {
    try {
      const { data, error } = await supabase.auth.updateUser(updates);

      if (error) {
        return {
          success: false,
          error: {
            message: error.message,
            code: error.status?.toString(),
          },
        };
      }

      return {
        success: true,
        user: data.user,
      };
    } catch (error) {
      return {
        success: false,
        error: {
          message: "Erro ao atualizar perfil",
        },
      };
    }
  }

  /**
   * Envia email de recuperação de senha
   */
  static async resetPassword(email: string): Promise<AuthResult> {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });

      if (error) {
        return {
          success: false,
          error: {
            message: error.message,
            code: error.status?.toString(),
          },
        };
      }

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: {
          message: "Erro ao enviar email de recuperação",
        },
      };
    }
  }
}
