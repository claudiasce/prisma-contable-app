import { IsNull, Like } from 'typeorm';
import { Injectable, Logger } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { format, toDate } from 'date-fns-tz';
import * as process from 'process';
import axios from 'axios';

export class UtilLib {
  timeZone = '';

  constructor() {
    this.timeZone = process.env.WS_COMPANY_NAME_DEFAULT;
  }

  whereBuilder({ whereModel, codes }) {
    const model = {};
    if (whereModel) {
      for (const k of Object.keys(whereModel)) {
        const v = whereModel[k];
        if (v !== 'null') {
          if (codes.includes(k) && v) {
            model[k] = v || IsNull();
          } else {
            model[k] = Like('%' + v + '%');
          }
        }
      }
    }
    return model;
  }

  filterBuilder(model: any) {
    const {
      page = 1,
      limit = 10,
      sortDirection = 'asc',
      sortColumn = 'id',
    } = model?.filters || {};
    delete model?.filters?.page;
    delete model?.filters?.limit;
    delete model?.filters?.sortDirection;
    delete model?.filters?.sortColumn;
    return {
      sortDirection,
      sortColumn,
      whereModel: model.filters,
      take: limit,
      skip: (page - 1) * limit,
      idCompany: model.idCompany,
    };
  }

  resultTransformer(result: any) {
    return {
      rows: result?.length > 0 ? result[0] : [],
      count: result?.length > 1 ? result[1] : 0,
    };
  }

  getUuid() {
    return uuidv4();
  }

  getNowStringDate() {
    return format(new Date(), 'yyyy-MM-dd HH:mm:ss', {
      timeZone: this.timeZone,
    });
  }

  getNowDate(): Date {
    return toDate(new Date(), { timeZone: this.timeZone });
  }

  formatPhone(phoneNumber: string): string {
    // Verifica si el número empieza con '0' y lo elimina
    if (phoneNumber.startsWith('0')) {
      phoneNumber = phoneNumber.substring(1);
    }
    const countryCode = '593';
    return `${countryCode}${phoneNumber}`;
  }

  transformBaseAtMime(b64: string): string {
    const signatures = {
      JVBERi0: 'application/pdf',
      R0lGODdh: 'image/gif',
      R0lGODlh: 'image/gif',
      iVBORw0KGgo: 'image/png',
      '/9j/': 'image/jpg',
    };
    for (const s in signatures) {
      if (b64.indexOf(s) === 0) {
        return signatures[s];
      }
    }
  }

  postRequest({ url, route, body, token }) {
    return new Promise((resolve, reject) => {
      const config = {
        headers: {},
      };
      if (token) {
        config.headers = {
          Authorization: `Bearer ${token}`,
        };
      }
      axios
        .request({
          url: `${url}${route}`,
          data: body,
          method: 'POST',
          headers: config.headers,
        })
        .then((data: any) => {
          resolve(data?.data);
        })
        .catch((err) => {
          console.log(err, 'MI');
          reject(err);
        });
    });
  }

  getRandomNumbers(digits: number) {
    if (digits <= 0) {
      throw new Error('El número de dígitos debe ser mayor que 0');
    }

    const min = Math.pow(10, digits - 1);
    const max = Math.pow(10, digits) - 1;

    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  sanitizePhone(phone: string): string | null {
    if (!phone) return null;

    let clean = phone.replace(/\D/g, '');

    if (!clean) return null;

    if (!/^\d+$/.test(clean)) return null;

    if (clean.startsWith('593')) {
      return clean;
    }
    if (clean.startsWith('0')) {
      clean = clean.substring(1);
    }
    return '593' + clean;
  }

  generateCustomId(prefix?: string): string {
    prefix = prefix || this.generatePrefix();

    const timestamp = Date.now().toString().slice(-9); // últimos 9 dígitos
    const random = parseInt(this.randomBytes(4).toString('hex'), 16)
      .toString()
      .padStart(5, '0')
      .slice(0, 5);

    return `${prefix}-${timestamp}${random}`; // 14 dígitos exactos
  }

  generatePrefix(length?: number): string {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    length = length || 3;
    const bytes = this.randomBytes(length > 0 ? length : 3);

    let result = '';
    for (let i = 0; i < length; i++) {
      result += alphabet[bytes[i] % alphabet.length];
    }

    return result;
  }

  private randomBytes(length: number) {
    if (typeof length !== 'number' || length < 0) {
      throw new Error('length debe ser un número no negativo');
    }

    const bytes = Buffer.alloc(length);

    for (let i = 0; i < length; i++) {
      // Usa Math.random() para generar números entre 0-255
      bytes[i] = Math.floor(Math.random() * 256);
    }
    return bytes;
  }
}
