import nodemailer from "nodemailer"
import { envs } from "../../config/plugins/envs.plugin"
import { LogRepository } from "../../domain/repository/log.repository";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

interface SendMailOptions {
    to: string | string[];
    subject: string;
    htmlBody: string;
    attachements?: Attachement[]

}

interface Attachement {
    filename: string;
    path: string;
}

export class EmailService {
    private transporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth:{
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY
        }
    })

    constructor(){}

    async sendEmail(options: SendMailOptions): Promise<boolean>{
        const { to, subject, htmlBody, attachements = [] } = options

        try{
            const sendInformation = await this.transporter.sendMail({
                to,
                subject,
                html: htmlBody,
                attachments: attachements
            })
        
            return true
        }catch(error){
  
            return false
        }
    }

    async sendEmailWithFileSystemLogs( to: string | string[]){
        const subject = 'Logs del servidor'
        const htmlBody = `
        <h1>Prueba</h1>
      <p>Patata</p>
      <p>Hola desde la consola</p>`
        const attachements:Attachement[] = [
            {filename: 'logs-all.log', path: "./logs/logs-all.log"},
            {filename: 'logs-high.log', path: "./logs/logs-high.log"},
            {filename: 'logs-medium.log', path: "./logs/logs-medium.log"}
        ]

       return this.sendEmail({
        to, subject, attachements, htmlBody
    })
    } 

}