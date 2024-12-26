use anchor_lang::prelude::*;
use std::str::FromStr;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
pub mod blink_account {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }

    pub fn bind_account(ctx: Context<BindAccount>, user_id: String) -> Result<()> {
        require!(user_id.len() <= 32, CustomError::UserIdTooLong);
        require!(
            user_id.chars().all(|c| c.is_alphanumeric() || c == '#'),
            CustomError::InvalidUserId
        );

        let account = &mut ctx.accounts.user_account;
        account.user_id = user_id;
        account.wallet = ctx.accounts.signer.key();
        account.bump = *ctx.bumps.get("user_account").unwrap();

        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}

#[derive(Accounts)]
#[instruction(user_id: String)]
pub struct BindAccount<'info> {
    #[account(
        init,
        payer = signer,
        space = 8 + 32 + 32 + 1,
        seeds = [b"user", user_id.as_bytes()],
        bump
    )]
    pub user_account: Account<'info, UserAccount>,
    
    #[account(mut)]
    pub signer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct UserAccount {
    pub user_id: String,
    pub wallet: Pubkey,
    pub bump: u8,
}

#[error_code]
pub enum CustomError {
    #[msg("User ID must be 32 characters or less")]
    UserIdTooLong,
    #[msg("User ID can only contain alphanumeric characters and #")]
    InvalidUserId,
}