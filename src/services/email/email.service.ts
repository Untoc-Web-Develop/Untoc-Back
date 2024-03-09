import { randomBytes } from 'crypto';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MailerService } from '@nestjs-modules/mailer';
import { Email } from 'src/entities/email.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmailService {
  constructor(
    @InjectRepository(Email)
    private readonly emailRepository: Repository<Email>,
    private readonly mailerService: MailerService,
  ) {}

  async sendEmail(email: string): Promise<Email> {
    const emailData = await this.emailRepository.findOne({
      where: { email },
    });
    const verificationCode = this.generateVerificationCode();
    if (emailData) {
      emailData.verificationCode = verificationCode;
      emailData.isVerified = false;
      this.sendVerificationEmail(emailData.email, verificationCode);
      return await this.emailRepository.save(emailData);
    } else {
      const newEmail = new Email();
      newEmail.email = email;
      newEmail.verificationCode = verificationCode;
      this.sendVerificationEmail(email, verificationCode);
      return await this.emailRepository.save(newEmail);
    }
  }

  private generateVerificationCode(): string {
    const buffer = randomBytes(3);
    return buffer.toString('hex').toUpperCase().slice(0, 6);
  }

  private async sendVerificationEmail(
    email: string,
    verificationCode: string,
  ): Promise<void> {
    await this.mailerService.sendMail({
      from: process.env.EMAIL_ADDRESS,
      to: email,
      subject: 'UNTOC 회원가입 이메일 인증 코드입니다.',
      text: `인증 코드: ${verificationCode}`,
    });
  }

  async verifyEmail(email: string, verificationCode: string): Promise<boolean> {
    console.log('Verifying email:', email);
    console.log('Verification code:', verificationCode);
    const emailVerification = await this.emailRepository.findOne({
      where: { email: email },
    });
    if (emailVerification) {
      if (emailVerification.verificationCode === verificationCode) {
        emailVerification.isVerified = true;
        await this.emailRepository.save(emailVerification);
        return true;
      } else {
        throw new Error('인증 코드가 일치하지 않습니다.');
      }
    } else {
      throw new Error('해당 이메일이 존재하지 않습니다.');
    }
  }
}
