import type { Scenario } from 'src/reflow/types'

export const scenarios: Scenario[] = [
  {
    workOrders: [
      {
        docId: 'wo-moFDyTgV',
        docType: 'workOrder',
        data: {
          workOrderNumber: 'WO-GNLQTQRQ',
          manufacturingOrderId: 'mo-gv7XCdAe',
          workCenterId: 'wc-pGX39qzP',
          startDate: '2026-01-22T15:00:00.000Z',
          endDate: '2026-01-23T08:01:00.000Z',
          durationMinutes: 121,
          isMaintenance: false,
          dependsOnWorkOrderIds: [],
        },
      },
      {
        docId: 'wo-aqjPJHyh',
        docType: 'workOrder',
        data: {
          workOrderNumber: 'WO-FGXYBW1L',
          manufacturingOrderId: 'mo-Ix1UGMyr',
          workCenterId: 'wc-pGX39qzP',
          startDate: '2026-02-03T15:00:00.000Z',
          endDate: '2026-02-04T10:25:00.000Z',
          durationMinutes: 265,
          isMaintenance: false,
          dependsOnWorkOrderIds: [
            'wo-moFDyTgV',
          ],
        },
      },
      {
        docId: 'wo-2bOpODla',
        docType: 'workOrder',
        data: {
          workOrderNumber: 'WO-IZIYHB7C',
          manufacturingOrderId: 'mo-ydBYuwMy',
          workCenterId: 'wc-pGX39qzP',
          startDate: '2026-01-26T08:00:00.000Z',
          endDate: '2026-01-26T13:21:00.000Z',
          durationMinutes: 321,
          isMaintenance: false,
          dependsOnWorkOrderIds: [
            'wo-aqjPJHyh',
            'wo-moFDyTgV',
          ],
        },
      },
      {
        docId: 'wo-vExkwmSs',
        docType: 'workOrder',
        data: {
          workOrderNumber: 'WO-GPMAAYAW',
          manufacturingOrderId: 'mo-ijbBdqzC',
          workCenterId: 'wc-pGX39qzP',
          startDate: '2026-02-03T15:00:00.000Z',
          endDate: '2026-02-03T16:09:00.000Z',
          durationMinutes: 69,
          isMaintenance: false,
          dependsOnWorkOrderIds: [],
        },
      },
      {
        docId: 'wo-qOrEDBSn',
        docType: 'workOrder',
        data: {
          workOrderNumber: 'WO-UDRVWYZV',
          manufacturingOrderId: 'mo-Gjtt8R1d',
          workCenterId: 'wc-8i94e32t',
          startDate: '2026-02-05T15:00:00.000Z',
          endDate: '2026-02-06T13:28:00.000Z',
          durationMinutes: 448,
          isMaintenance: false,
          dependsOnWorkOrderIds: [],
        },
      },
      {
        docId: 'wo-Uwe57lro',
        docType: 'workOrder',
        data: {
          workOrderNumber: 'WO-AZUVTC9Y',
          manufacturingOrderId: 'mo-ydBYuwMy',
          workCenterId: 'wc-pGX39qzP',
          startDate: '2026-01-22T15:00:00.000Z',
          endDate: '2026-01-23T09:43:00.000Z',
          durationMinutes: 223,
          isMaintenance: false,
          dependsOnWorkOrderIds: [
            'wo-moFDyTgV',
          ],
        },
      },
      {
        docId: 'wo-DlF6h6po',
        docType: 'workOrder',
        data: {
          workOrderNumber: 'WO-ZRTRVSGX',
          manufacturingOrderId: 'mo-3lrpbQKc',
          workCenterId: 'wc-8i94e32t',
          startDate: '2026-02-05T15:00:00.000Z',
          endDate: '2026-02-06T08:52:00.000Z',
          durationMinutes: 172,
          isMaintenance: true,
          dependsOnWorkOrderIds: [],
        },
      },
      {
        docId: 'wo-gvJwcXte',
        docType: 'workOrder',
        data: {
          workOrderNumber: 'WO-DUT1SMFK',
          manufacturingOrderId: 'mo-imwN84mx',
          workCenterId: 'wc-pGX39qzP',
          startDate: '2026-02-02T15:00:00.000Z',
          endDate: '2026-02-03T13:03:00.000Z',
          durationMinutes: 423,
          isMaintenance: false,
          dependsOnWorkOrderIds: [],
        },
      },
      {
        docId: 'wo-JPH3AjIG',
        docType: 'workOrder',
        data: {
          workOrderNumber: 'WO-BZCH0VQI',
          manufacturingOrderId: 'mo-3lrpbQKc',
          workCenterId: 'wc-8i94e32t',
          startDate: '2026-02-05T15:00:00.000Z',
          endDate: '2026-02-06T10:20:00.000Z',
          durationMinutes: 260,
          isMaintenance: false,
          dependsOnWorkOrderIds: [],
        },
      },
      {
        docId: 'wo-6WnTOmyj',
        docType: 'workOrder',
        data: {
          workOrderNumber: 'WO-EWHR0CEO',
          manufacturingOrderId: 'mo-ZWaHTOON',
          workCenterId: 'wc-8i94e32t',
          startDate: '2026-02-03T15:00:00.000Z',
          endDate: '2026-02-03T15:54:00.000Z',
          durationMinutes: 54,
          isMaintenance: false,
          dependsOnWorkOrderIds: [],
        },
      },
    ],
    workCenters: [
      {
        docId: 'wc-pGX39qzP',
        docType: 'workCenter',
        data: {
          name: 'Work Center 1',
          shifts: [
            {
              dayOfWeek: 1,
              startHour: 8,
              endHour: 17,
            },
            {
              dayOfWeek: 2,
              startHour: 8,
              endHour: 17,
            },
            {
              dayOfWeek: 3,
              startHour: 8,
              endHour: 17,
            },
            {
              dayOfWeek: 4,
              startHour: 8,
              endHour: 17,
            },
            {
              dayOfWeek: 5,
              startHour: 8,
              endHour: 17,
            },
          ],
          maintenanceWindows: [],
        },
      },
      {
        docId: 'wc-8i94e32t',
        docType: 'workCenter',
        data: {
          name: 'Work Center 2',
          shifts: [
            {
              dayOfWeek: 1,
              startHour: 8,
              endHour: 17,
            },
            {
              dayOfWeek: 2,
              startHour: 8,
              endHour: 17,
            },
            {
              dayOfWeek: 3,
              startHour: 8,
              endHour: 17,
            },
            {
              dayOfWeek: 4,
              startHour: 8,
              endHour: 17,
            },
            {
              dayOfWeek: 5,
              startHour: 8,
              endHour: 17,
            },
          ],
          maintenanceWindows: [],
        },
      },
    ],
    manufacturingOrders: [
      {
        docId: 'mo-3lrpbQKc',
        docType: 'manufacturingOrder',
        data: {
          manufacturingOrderNumber: 'MO-WPVLJ9TM',
          itemId: 'ITEM-RO22T6',
          quantity: 212,
          dueDate: '2026-03-18T15:43:53.001Z',
        },
      },
      {
        docId: 'mo-Ix1UGMyr',
        docType: 'manufacturingOrder',
        data: {
          manufacturingOrderNumber: 'MO-MHOBVYBA',
          itemId: 'ITEM-SBUBBE',
          quantity: 719,
          dueDate: '2026-02-08T15:43:53.002Z',
        },
      },
      {
        docId: 'mo-RB3Y9okf',
        docType: 'manufacturingOrder',
        data: {
          manufacturingOrderNumber: 'MO-O4NLYSPD',
          itemId: 'ITEM-FW8CYV',
          quantity: 738,
          dueDate: '2026-03-18T15:43:53.002Z',
        },
      },
      {
        docId: 'mo-4HJHQH7N',
        docType: 'manufacturingOrder',
        data: {
          manufacturingOrderNumber: 'MO-XOC1G4KA',
          itemId: 'ITEM-UPBHRM',
          quantity: 207,
          dueDate: '2026-02-09T15:43:53.002Z',
        },
      },
      {
        docId: 'mo-ijbBdqzC',
        docType: 'manufacturingOrder',
        data: {
          manufacturingOrderNumber: 'MO-PADHVSTW',
          itemId: 'ITEM-OYZ1SD',
          quantity: 14,
          dueDate: '2026-02-20T15:43:53.002Z',
        },
      },
      {
        docId: 'mo-ydBYuwMy',
        docType: 'manufacturingOrder',
        data: {
          manufacturingOrderNumber: 'MO-KAJWGDIZ',
          itemId: 'ITEM-2SAZ5D',
          quantity: 132,
          dueDate: '2026-02-21T15:43:53.002Z',
        },
      },
      {
        docId: 'mo-Gjtt8R1d',
        docType: 'manufacturingOrder',
        data: {
          manufacturingOrderNumber: 'MO-ILDBPO5Z',
          itemId: 'ITEM-HCVEKB',
          quantity: 298,
          dueDate: '2026-03-02T15:43:53.002Z',
        },
      },
      {
        docId: 'mo-gv7XCdAe',
        docType: 'manufacturingOrder',
        data: {
          manufacturingOrderNumber: 'MO-6E2LEAOZ',
          itemId: 'ITEM-IZOTPQ',
          quantity: 677,
          dueDate: '2026-02-16T15:43:53.002Z',
        },
      },
      {
        docId: 'mo-ZWaHTOON',
        docType: 'manufacturingOrder',
        data: {
          manufacturingOrderNumber: 'MO-PFVYSOPJ',
          itemId: 'ITEM-B82ISZ',
          quantity: 711,
          dueDate: '2026-02-21T15:43:53.003Z',
        },
      },
      {
        docId: 'mo-imwN84mx',
        docType: 'manufacturingOrder',
        data: {
          manufacturingOrderNumber: 'MO-UOT6FGQE',
          itemId: 'ITEM-VQVO8U',
          quantity: 470,
          dueDate: '2026-03-16T15:43:53.003Z',
        },
      },
    ],
  },

  {
    workOrders: [
      {
        docId: 'wo-Ll0uxqc7',
        docType: 'workOrder',
        data: {
          workOrderNumber: 'WO-YXSXXOMN',
          manufacturingOrderId: 'mo-HL90NlbN',
          workCenterId: 'wc-CO7i3um5',
          startDate: '2026-02-02T08:00:00.000Z',
          endDate: '2026-02-02T11:23:00.000Z',
          durationMinutes: 203,
          isMaintenance: false,
          dependsOnWorkOrderIds: [],
        },
      },
      {
        docId: 'wo-hMTL1iBf',
        docType: 'workOrder',
        data: {
          workOrderNumber: 'WO-NXNTUBWZ',
          manufacturingOrderId: 'mo-HL90NlbN',
          workCenterId: 'wc-imyJRGyD',
          startDate: '2026-01-29T15:00:00.000Z',
          endDate: '2026-01-29T16:00:00.000Z',
          durationMinutes: 60,
          isMaintenance: false,
          dependsOnWorkOrderIds: [],
        },
      },
      {
        docId: 'wo-l5oW7f9k',
        docType: 'workOrder',
        data: {
          workOrderNumber: 'WO-6NMU3JL8',
          manufacturingOrderId: 'mo-33Nv6QOZ',
          workCenterId: 'wc-CO7i3um5',
          startDate: '2026-02-02T08:00:00.000Z',
          endDate: '2026-02-02T13:12:00.000Z',
          durationMinutes: 312,
          isMaintenance: false,
          dependsOnWorkOrderIds: [
            'wo-Ll0uxqc7',
          ],
        },
      },
      {
        docId: 'wo-hBfLlsyx',
        docType: 'workOrder',
        data: {
          workOrderNumber: 'WO-KMSTGI31',
          manufacturingOrderId: 'mo-hb0EsvEE',
          workCenterId: 'wc-CO7i3um5',
          startDate: '2026-01-22T15:00:00.000Z',
          endDate: '2026-01-23T10:15:00.000Z',
          durationMinutes: 255,
          isMaintenance: false,
          dependsOnWorkOrderIds: [
            'wo-l5oW7f9k',
            'wo-Ll0uxqc7',
          ],
        },
      },
      {
        docId: 'wo-FhcXyHXq',
        docType: 'workOrder',
        data: {
          workOrderNumber: 'WO-6GFHA6QV',
          manufacturingOrderId: 'mo-8p3YojES',
          workCenterId: 'wc-imyJRGyD',
          startDate: '2026-01-23T15:00:00.000Z',
          endDate: '2026-01-26T08:01:00.000Z',
          durationMinutes: 121,
          isMaintenance: false,
          dependsOnWorkOrderIds: [
            'wo-hMTL1iBf',
          ],
        },
      },
      {
        docId: 'wo-rd7Q7XjM',
        docType: 'workOrder',
        data: {
          workOrderNumber: 'WO-7JTV7ILE',
          manufacturingOrderId: 'mo-GulR1dyM',
          workCenterId: 'wc-CO7i3um5',
          startDate: '2026-01-30T15:00:00.000Z',
          endDate: '2026-02-02T11:08:00.000Z',
          durationMinutes: 308,
          isMaintenance: false,
          dependsOnWorkOrderIds: [
            'wo-l5oW7f9k',
            'wo-Ll0uxqc7',
            'wo-hBfLlsyx',
          ],
        },
      },
      {
        docId: 'wo-E9r5L1Fa',
        docType: 'workOrder',
        data: {
          workOrderNumber: 'WO-FAMFC76R',
          manufacturingOrderId: 'mo-hjCPri0B',
          workCenterId: 'wc-CO7i3um5',
          startDate: '2026-01-30T15:00:00.000Z',
          endDate: '2026-01-30T16:09:00.000Z',
          durationMinutes: 69,
          isMaintenance: true,
          dependsOnWorkOrderIds: [],
        },
      },
      {
        docId: 'wo-UmQ03uQG',
        docType: 'workOrder',
        data: {
          workOrderNumber: 'WO-CZPPSTBN',
          manufacturingOrderId: 'mo-vE5wid1e',
          workCenterId: 'wc-CO7i3um5',
          startDate: '2026-01-22T15:00:00.000Z',
          endDate: '2026-01-23T13:48:00.000Z',
          durationMinutes: 468,
          isMaintenance: false,
          dependsOnWorkOrderIds: [
            'wo-FhcXyHXq',
          ],
        },
      },
      {
        docId: 'wo-teuyjtXj',
        docType: 'workOrder',
        data: {
          workOrderNumber: 'WO-A2A9OARO',
          manufacturingOrderId: 'mo-vE5wid1e',
          workCenterId: 'wc-CO7i3um5',
          startDate: '2026-01-26T15:00:00.000Z',
          endDate: '2026-01-26T15:58:00.000Z',
          durationMinutes: 58,
          isMaintenance: false,
          dependsOnWorkOrderIds: [
            'wo-FhcXyHXq',
            'wo-Ll0uxqc7',
            'wo-l5oW7f9k',
          ],
        },
      },
      {
        docId: 'wo-kcRr3lVn',
        docType: 'workOrder',
        data: {
          workOrderNumber: 'WO-N0LYU11D',
          manufacturingOrderId: 'mo-IjR5IEf4',
          workCenterId: 'wc-imyJRGyD',
          startDate: '2026-02-02T15:00:00.000Z',
          endDate: '2026-02-03T08:04:00.000Z',
          durationMinutes: 124,
          isMaintenance: false,
          dependsOnWorkOrderIds: [
            'wo-teuyjtXj',
          ],
        },
      },
    ],
    workCenters: [
      {
        docId: 'wc-CO7i3um5',
        docType: 'workCenter',
        data: {
          name: 'Work Center 1',
          shifts: [
            {
              dayOfWeek: 1,
              startHour: 8,
              endHour: 17,
            },
            {
              dayOfWeek: 2,
              startHour: 8,
              endHour: 17,
            },
            {
              dayOfWeek: 3,
              startHour: 8,
              endHour: 17,
            },
            {
              dayOfWeek: 4,
              startHour: 8,
              endHour: 17,
            },
            {
              dayOfWeek: 5,
              startHour: 8,
              endHour: 17,
            },
          ],
          maintenanceWindows: [],
        },
      },
      {
        docId: 'wc-imyJRGyD',
        docType: 'workCenter',
        data: {
          name: 'Work Center 2',
          shifts: [
            {
              dayOfWeek: 1,
              startHour: 8,
              endHour: 17,
            },
            {
              dayOfWeek: 2,
              startHour: 8,
              endHour: 17,
            },
            {
              dayOfWeek: 3,
              startHour: 8,
              endHour: 17,
            },
            {
              dayOfWeek: 4,
              startHour: 8,
              endHour: 17,
            },
            {
              dayOfWeek: 5,
              startHour: 8,
              endHour: 17,
            },
          ],
          maintenanceWindows: [],
        },
      },
    ],
    manufacturingOrders: [
      {
        docId: 'mo-tuAlRvgT',
        docType: 'manufacturingOrder',
        data: {
          manufacturingOrderNumber: 'MO-LODVROY0',
          itemId: 'ITEM-JBUAIE',
          quantity: 937,
          dueDate: '2026-03-19T15:43:53.007Z',
        },
      },
      {
        docId: 'mo-33Nv6QOZ',
        docType: 'manufacturingOrder',
        data: {
          manufacturingOrderNumber: 'MO-280FMWWB',
          itemId: 'ITEM-ZBGAYE',
          quantity: 837,
          dueDate: '2026-03-08T15:43:53.007Z',
        },
      },
      {
        docId: 'mo-hb0EsvEE',
        docType: 'manufacturingOrder',
        data: {
          manufacturingOrderNumber: 'MO-BZYTPSI3',
          itemId: 'ITEM-2AO9EO',
          quantity: 102,
          dueDate: '2026-02-19T15:43:53.007Z',
        },
      },
      {
        docId: 'mo-4xFNTjQp',
        docType: 'manufacturingOrder',
        data: {
          manufacturingOrderNumber: 'MO-ECVHJQJ5',
          itemId: 'ITEM-EYRZAA',
          quantity: 939,
          dueDate: '2026-03-14T15:43:53.007Z',
        },
      },
      {
        docId: 'mo-TdUv7CuO',
        docType: 'manufacturingOrder',
        data: {
          manufacturingOrderNumber: 'MO-32PY4RHN',
          itemId: 'ITEM-NSDCZR',
          quantity: 829,
          dueDate: '2026-02-07T15:43:53.007Z',
        },
      },
      {
        docId: 'mo-nXM2EH3Z',
        docType: 'manufacturingOrder',
        data: {
          manufacturingOrderNumber: 'MO-NGYHQ4UU',
          itemId: 'ITEM-UNKWXX',
          quantity: 186,
          dueDate: '2026-02-14T15:43:53.007Z',
        },
      },
      {
        docId: 'mo-nZGsx4oB',
        docType: 'manufacturingOrder',
        data: {
          manufacturingOrderNumber: 'MO-STPC4KJK',
          itemId: 'ITEM-64DGH8',
          quantity: 743,
          dueDate: '2026-02-21T15:43:53.007Z',
        },
      },
      {
        docId: 'mo-x6CS6yTE',
        docType: 'manufacturingOrder',
        data: {
          manufacturingOrderNumber: 'MO-HGY42Z93',
          itemId: 'ITEM-XQLIL5',
          quantity: 665,
          dueDate: '2026-03-07T15:43:53.007Z',
        },
      },
      {
        docId: 'mo-GulR1dyM',
        docType: 'manufacturingOrder',
        data: {
          manufacturingOrderNumber: 'MO-UMW6Q9T3',
          itemId: 'ITEM-CKYISE',
          quantity: 669,
          dueDate: '2026-02-14T15:43:53.007Z',
        },
      },
      {
        docId: 'mo-nEbIZ5Ja',
        docType: 'manufacturingOrder',
        data: {
          manufacturingOrderNumber: 'MO-WGYZMITZ',
          itemId: 'ITEM-NFOALR',
          quantity: 272,
          dueDate: '2026-03-03T15:43:53.007Z',
        },
      },
      {
        docId: 'mo-O1YD9Y2c',
        docType: 'manufacturingOrder',
        data: {
          manufacturingOrderNumber: 'MO-S5CQCBHE',
          itemId: 'ITEM-YOEEEQ',
          quantity: 222,
          dueDate: '2026-03-10T15:43:53.007Z',
        },
      },
      {
        docId: 'mo-hjCPri0B',
        docType: 'manufacturingOrder',
        data: {
          manufacturingOrderNumber: 'MO-HAPZQISG',
          itemId: 'ITEM-YOHBVQ',
          quantity: 893,
          dueDate: '2026-02-04T15:43:53.007Z',
        },
      },
      {
        docId: 'mo-07yE6bLd',
        docType: 'manufacturingOrder',
        data: {
          manufacturingOrderNumber: 'MO-WJGU10U5',
          itemId: 'ITEM-7AAMUC',
          quantity: 347,
          dueDate: '2026-02-04T15:43:53.007Z',
        },
      },
      {
        docId: 'mo-vE5wid1e',
        docType: 'manufacturingOrder',
        data: {
          manufacturingOrderNumber: 'MO-ZGSE7MMX',
          itemId: 'ITEM-IT7BTZ',
          quantity: 303,
          dueDate: '2026-02-05T15:43:53.008Z',
        },
      },
      {
        docId: 'mo-IjR5IEf4',
        docType: 'manufacturingOrder',
        data: {
          manufacturingOrderNumber: 'MO-SHWSRPOX',
          itemId: 'ITEM-MUZ8R2',
          quantity: 262,
          dueDate: '2026-02-15T15:43:53.008Z',
        },
      },
      {
        docId: 'mo-HL90NlbN',
        docType: 'manufacturingOrder',
        data: {
          manufacturingOrderNumber: 'MO-JAIIJRTK',
          itemId: 'ITEM-SQ0HPV',
          quantity: 458,
          dueDate: '2026-02-20T15:43:53.008Z',
        },
      },
      {
        docId: 'mo-8p3YojES',
        docType: 'manufacturingOrder',
        data: {
          manufacturingOrderNumber: 'MO-HY3DETZ0',
          itemId: 'ITEM-QGTD6Z',
          quantity: 297,
          dueDate: '2026-02-26T15:43:53.008Z',
        },
      },
      {
        docId: 'mo-lW012hY9',
        docType: 'manufacturingOrder',
        data: {
          manufacturingOrderNumber: 'MO-JFUVXFSN',
          itemId: 'ITEM-DTPMNH',
          quantity: 686,
          dueDate: '2026-02-04T15:43:53.008Z',
        },
      },
      {
        docId: 'mo-ctbMfpog',
        docType: 'manufacturingOrder',
        data: {
          manufacturingOrderNumber: 'MO-SA97RHR7',
          itemId: 'ITEM-6PZTEO',
          quantity: 588,
          dueDate: '2026-02-06T15:43:53.008Z',
        },
      },
    ],
  },

  {
    workOrders: [
      {
        docId: 'wo-K0hJ4G53',
        docType: 'workOrder',
        data: {
          workOrderNumber: 'WO-9QWBKY3H',
          manufacturingOrderId: 'mo-Hfo4n0DS',
          workCenterId: 'wc-WXzvwUFY',
          startDate: '2026-01-28T15:00:00.000Z',
          endDate: '2026-01-29T12:04:00.000Z',
          durationMinutes: 364,
          isMaintenance: false,
          dependsOnWorkOrderIds: [],
        },
      },
      {
        docId: 'wo-LcxLLGsM',
        docType: 'workOrder',
        data: {
          workOrderNumber: 'WO-ODKGWQGK',
          manufacturingOrderId: 'mo-5mzuxuJC',
          workCenterId: 'wc-GGJLQDtU',
          startDate: '2026-01-28T15:00:00.000Z',
          endDate: '2026-01-28T15:34:00.000Z',
          durationMinutes: 34,
          isMaintenance: false,
          dependsOnWorkOrderIds: [],
        },
      },
      {
        docId: 'wo-Ctb21j8m',
        docType: 'workOrder',
        data: {
          workOrderNumber: 'WO-RUNT7DI7',
          manufacturingOrderId: 'mo-5mzuxuJC',
          workCenterId: 'wc-GGJLQDtU',
          startDate: '2026-02-05T15:00:00.000Z',
          endDate: '2026-02-05T16:35:00.000Z',
          durationMinutes: 95,
          isMaintenance: false,
          dependsOnWorkOrderIds: [
            'wo-LcxLLGsM',
          ],
        },
      },
      {
        docId: 'wo-ajxax4at',
        docType: 'workOrder',
        data: {
          workOrderNumber: 'WO-NP4O7XJ2',
          manufacturingOrderId: 'mo-g7PDmxP0',
          workCenterId: 'wc-WXzvwUFY',
          startDate: '2026-01-29T15:00:00.000Z',
          endDate: '2026-01-30T09:39:00.000Z',
          durationMinutes: 219,
          isMaintenance: false,
          dependsOnWorkOrderIds: [
            'wo-K0hJ4G53',
            'wo-LcxLLGsM',
            'wo-Ctb21j8m',
          ],
        },
      },
      {
        docId: 'wo-nKHlfe9W',
        docType: 'workOrder',
        data: {
          workOrderNumber: 'WO-QPRSFBOD',
          manufacturingOrderId: 'mo-6vgSrIDq',
          workCenterId: 'wc-GGJLQDtU',
          startDate: '2026-02-02T08:00:00.000Z',
          endDate: '2026-02-02T14:46:00.000Z',
          durationMinutes: 406,
          isMaintenance: true,
          dependsOnWorkOrderIds: [],
        },
      },
      {
        docId: 'wo-hjDjwCzz',
        docType: 'workOrder',
        data: {
          workOrderNumber: 'WO-INHNJYPP',
          manufacturingOrderId: 'mo-6vgSrIDq',
          workCenterId: 'wc-GGJLQDtU',
          startDate: '2026-02-02T15:00:00.000Z',
          endDate: '2026-02-03T12:00:00.000Z',
          durationMinutes: 360,
          isMaintenance: false,
          dependsOnWorkOrderIds: [
            'wo-LcxLLGsM',
          ],
        },
      },
      {
        docId: 'wo-Y3Le5IbU',
        docType: 'workOrder',
        data: {
          workOrderNumber: 'WO-TY71FHP8',
          manufacturingOrderId: 'mo-lXEjqzfB',
          workCenterId: 'wc-BWMcuSXs',
          startDate: '2026-01-26T08:00:00.000Z',
          endDate: '2026-01-26T12:27:00.000Z',
          durationMinutes: 267,
          isMaintenance: false,
          dependsOnWorkOrderIds: [],
        },
      },
      {
        docId: 'wo-waEUZhwL',
        docType: 'workOrder',
        data: {
          workOrderNumber: 'WO-KZZGHESC',
          manufacturingOrderId: 'mo-Ggka3Ydo',
          workCenterId: 'wc-WXzvwUFY',
          startDate: '2026-02-04T15:00:00.000Z',
          endDate: '2026-02-05T11:08:00.000Z',
          durationMinutes: 308,
          isMaintenance: false,
          dependsOnWorkOrderIds: [],
        },
      },
      {
        docId: 'wo-l6QJhNWV',
        docType: 'workOrder',
        data: {
          workOrderNumber: 'WO-CXFR8EJH',
          manufacturingOrderId: 'mo-5mzuxuJC',
          workCenterId: 'wc-BWMcuSXs',
          startDate: '2026-02-02T08:00:00.000Z',
          endDate: '2026-02-02T15:46:00.000Z',
          durationMinutes: 466,
          isMaintenance: false,
          dependsOnWorkOrderIds: [],
        },
      },
      {
        docId: 'wo-k9nesxvZ',
        docType: 'workOrder',
        data: {
          workOrderNumber: 'WO-IPWEJ53J',
          manufacturingOrderId: 'mo-Ggka3Ydo',
          workCenterId: 'wc-BWMcuSXs',
          startDate: '2026-02-05T15:00:00.000Z',
          endDate: '2026-02-06T09:25:00.000Z',
          durationMinutes: 205,
          isMaintenance: false,
          dependsOnWorkOrderIds: [],
        },
      },
    ],
    workCenters: [
      {
        docId: 'wc-WXzvwUFY',
        docType: 'workCenter',
        data: {
          name: 'Work Center 1',
          shifts: [
            {
              dayOfWeek: 1,
              startHour: 8,
              endHour: 17,
            },
            {
              dayOfWeek: 2,
              startHour: 8,
              endHour: 17,
            },
            {
              dayOfWeek: 3,
              startHour: 8,
              endHour: 17,
            },
            {
              dayOfWeek: 4,
              startHour: 8,
              endHour: 17,
            },
            {
              dayOfWeek: 5,
              startHour: 8,
              endHour: 17,
            },
          ],
          maintenanceWindows: [],
        },
      },
      {
        docId: 'wc-GGJLQDtU',
        docType: 'workCenter',
        data: {
          name: 'Work Center 2',
          shifts: [
            {
              dayOfWeek: 1,
              startHour: 8,
              endHour: 17,
            },
            {
              dayOfWeek: 2,
              startHour: 8,
              endHour: 17,
            },
            {
              dayOfWeek: 3,
              startHour: 8,
              endHour: 17,
            },
            {
              dayOfWeek: 4,
              startHour: 8,
              endHour: 17,
            },
            {
              dayOfWeek: 5,
              startHour: 8,
              endHour: 17,
            },
          ],
          maintenanceWindows: [],
        },
      },
      {
        docId: 'wc-BWMcuSXs',
        docType: 'workCenter',
        data: {
          name: 'Work Center 3',
          shifts: [
            {
              dayOfWeek: 1,
              startHour: 8,
              endHour: 17,
            },
            {
              dayOfWeek: 2,
              startHour: 8,
              endHour: 17,
            },
            {
              dayOfWeek: 3,
              startHour: 8,
              endHour: 17,
            },
            {
              dayOfWeek: 4,
              startHour: 8,
              endHour: 17,
            },
            {
              dayOfWeek: 5,
              startHour: 8,
              endHour: 17,
            },
          ],
          maintenanceWindows: [],
        },
      },
    ],
    manufacturingOrders: [
      {
        docId: 'mo-lXEjqzfB',
        docType: 'manufacturingOrder',
        data: {
          manufacturingOrderNumber: 'MO-TMFBCRP4',
          itemId: 'ITEM-ZBSGUW',
          quantity: 138,
          dueDate: '2026-02-27T15:45:16.909Z',
        },
      },
      {
        docId: 'mo-DsZv9Aci',
        docType: 'manufacturingOrder',
        data: {
          manufacturingOrderNumber: 'MO-HSQIP3R3',
          itemId: 'ITEM-FI7MXM',
          quantity: 607,
          dueDate: '2026-02-22T15:45:16.910Z',
        },
      },
      {
        docId: 'mo-o3B7zY4l',
        docType: 'manufacturingOrder',
        data: {
          manufacturingOrderNumber: 'MO-6SX1K8F9',
          itemId: 'ITEM-ROH6WW',
          quantity: 218,
          dueDate: '2026-03-08T15:45:16.910Z',
        },
      },
      {
        docId: 'mo-i5oK2rv5',
        docType: 'manufacturingOrder',
        data: {
          manufacturingOrderNumber: 'MO-ZFTBHX2B',
          itemId: 'ITEM-GSIOX9',
          quantity: 778,
          dueDate: '2026-03-19T15:45:16.910Z',
        },
      },
      {
        docId: 'mo-ftFlf7Lo',
        docType: 'manufacturingOrder',
        data: {
          manufacturingOrderNumber: 'MO-OXYNY2UC',
          itemId: 'ITEM-OQQBRS',
          quantity: 567,
          dueDate: '2026-02-11T15:45:16.911Z',
        },
      },
      {
        docId: 'mo-Zt79XJP7',
        docType: 'manufacturingOrder',
        data: {
          manufacturingOrderNumber: 'MO-LQXTKD7R',
          itemId: 'ITEM-PQ4MTE',
          quantity: 940,
          dueDate: '2026-01-31T15:45:16.911Z',
        },
      },
      {
        docId: 'mo-Hfo4n0DS',
        docType: 'manufacturingOrder',
        data: {
          manufacturingOrderNumber: 'MO-BWDHCTGF',
          itemId: 'ITEM-KXK9OT',
          quantity: 182,
          dueDate: '2026-03-13T15:45:16.911Z',
        },
      },
      {
        docId: 'mo-6vgSrIDq',
        docType: 'manufacturingOrder',
        data: {
          manufacturingOrderNumber: 'MO-MV84ERHM',
          itemId: 'ITEM-OQBAYW',
          quantity: 945,
          dueDate: '2026-02-19T15:45:16.911Z',
        },
      },
      {
        docId: 'mo-Ggka3Ydo',
        docType: 'manufacturingOrder',
        data: {
          manufacturingOrderNumber: 'MO-ZCBC65YV',
          itemId: 'ITEM-VKHIQT',
          quantity: 22,
          dueDate: '2026-02-12T15:45:16.911Z',
        },
      },
      {
        docId: 'mo-Bv9a9oWn',
        docType: 'manufacturingOrder',
        data: {
          manufacturingOrderNumber: 'MO-BNLJYEEG',
          itemId: 'ITEM-VN5UFS',
          quantity: 540,
          dueDate: '2026-02-12T15:45:16.911Z',
        },
      },
      {
        docId: 'mo-5mzuxuJC',
        docType: 'manufacturingOrder',
        data: {
          manufacturingOrderNumber: 'MO-OCK35MWQ',
          itemId: 'ITEM-ZCJDPV',
          quantity: 98,
          dueDate: '2026-03-17T15:45:16.911Z',
        },
      },
      {
        docId: 'mo-WEyTduIZ',
        docType: 'manufacturingOrder',
        data: {
          manufacturingOrderNumber: 'MO-E3SBZ8J3',
          itemId: 'ITEM-EEWOMC',
          quantity: 702,
          dueDate: '2026-02-11T15:45:16.911Z',
        },
      },
      {
        docId: 'mo-5MH4C4Bf',
        docType: 'manufacturingOrder',
        data: {
          manufacturingOrderNumber: 'MO-Y6YHPECD',
          itemId: 'ITEM-3RY5NF',
          quantity: 240,
          dueDate: '2026-02-06T15:45:16.911Z',
        },
      },
      {
        docId: 'mo-WC3pQWog',
        docType: 'manufacturingOrder',
        data: {
          manufacturingOrderNumber: 'MO-FLDB2MFD',
          itemId: 'ITEM-MI9PDW',
          quantity: 55,
          dueDate: '2026-01-31T15:45:16.911Z',
        },
      },
      {
        docId: 'mo-g7PDmxP0',
        docType: 'manufacturingOrder',
        data: {
          manufacturingOrderNumber: 'MO-HGXZIEP4',
          itemId: 'ITEM-5LKGPD',
          quantity: 19,
          dueDate: '2026-02-22T15:45:16.911Z',
        },
      },
      {
        docId: 'mo-hRKDwhoT',
        docType: 'manufacturingOrder',
        data: {
          manufacturingOrderNumber: 'MO-OPBORGX6',
          itemId: 'ITEM-NHLMQU',
          quantity: 34,
          dueDate: '2026-02-25T15:45:16.911Z',
        },
      },
    ],
  },

  {
    workOrders: [
      {
        docId: 'wo-imZ4HY7A',
        docType: 'workOrder',
        data: {
          workOrderNumber: 'WO-03YRXCK5',
          manufacturingOrderId: 'mo-ANGnqLPO',
          workCenterId: 'wc-6BQeXT5P',
          startDate: '2026-01-29T15:00:00.000Z',
          endDate: '2026-01-30T08:17:00.000Z',
          durationMinutes: 137,
          isMaintenance: false,
          dependsOnWorkOrderIds: [],
        },
      },
      {
        docId: 'wo-dYTOaN5y',
        docType: 'workOrder',
        data: {
          workOrderNumber: 'WO-MLZIMFEP',
          manufacturingOrderId: 'mo-Lri8ThNn',
          workCenterId: 'wc-AW9VYiqJ',
          startDate: '2026-01-22T15:00:00.000Z',
          endDate: '2026-01-23T11:07:00.000Z',
          durationMinutes: 307,
          isMaintenance: false,
          dependsOnWorkOrderIds: [],
        },
      },
      {
        docId: 'wo-KdinNZCs',
        docType: 'workOrder',
        data: {
          workOrderNumber: 'WO-2MIX0NUY',
          manufacturingOrderId: 'mo-qSvM0yT1',
          workCenterId: 'wc-xtLTXJbz',
          startDate: '2026-01-27T15:00:00.000Z',
          endDate: '2026-01-28T12:43:00.000Z',
          durationMinutes: 403,
          isMaintenance: false,
          dependsOnWorkOrderIds: [],
        },
      },
      {
        docId: 'wo-Gcs6YcQj',
        docType: 'workOrder',
        data: {
          workOrderNumber: 'WO-IU3RJOCV',
          manufacturingOrderId: 'mo-VOSdTMxt',
          workCenterId: 'wc-bXCkmv9E',
          startDate: '2026-01-26T15:00:00.000Z',
          endDate: '2026-01-27T12:00:00.000Z',
          durationMinutes: 360,
          isMaintenance: false,
          dependsOnWorkOrderIds: [],
        },
      },
      {
        docId: 'wo-PBwbrLLD',
        docType: 'workOrder',
        data: {
          workOrderNumber: 'WO-9C2VFE3Z',
          manufacturingOrderId: 'mo-Sb71MPFq',
          workCenterId: 'wc-bXCkmv9E',
          startDate: '2026-01-28T15:00:00.000Z',
          endDate: '2026-01-29T08:01:00.000Z',
          durationMinutes: 121,
          isMaintenance: false,
          dependsOnWorkOrderIds: [],
        },
      },
      {
        docId: 'wo-e3Vj8vyU',
        docType: 'workOrder',
        data: {
          workOrderNumber: 'WO-V4YNRSEE',
          manufacturingOrderId: 'mo-VOSdTMxt',
          workCenterId: 'wc-bXCkmv9E',
          startDate: '2026-02-02T15:00:00.000Z',
          endDate: '2026-02-03T08:37:00.000Z',
          durationMinutes: 157,
          isMaintenance: false,
          dependsOnWorkOrderIds: [],
        },
      },
      {
        docId: 'wo-3RA1GATr',
        docType: 'workOrder',
        data: {
          workOrderNumber: 'WO-PRX8Q7I1',
          manufacturingOrderId: 'mo-Lri8ThNn',
          workCenterId: 'wc-xtLTXJbz',
          startDate: '2026-02-04T15:00:00.000Z',
          endDate: '2026-02-04T15:44:00.000Z',
          durationMinutes: 44,
          isMaintenance: false,
          dependsOnWorkOrderIds: [],
        },
      },
      {
        docId: 'wo-a5nddn3B',
        docType: 'workOrder',
        data: {
          workOrderNumber: 'WO-BAFCSM8F',
          manufacturingOrderId: 'mo-Zznw9yxt',
          workCenterId: 'wc-6BQeXT5P',
          startDate: '2026-02-02T15:00:00.000Z',
          endDate: '2026-02-03T09:27:00.000Z',
          durationMinutes: 207,
          isMaintenance: false,
          dependsOnWorkOrderIds: [
            'wo-e3Vj8vyU',
            'wo-dYTOaN5y',
            'wo-PBwbrLLD',
          ],
        },
      },
      {
        docId: 'wo-7f9T6VJx',
        docType: 'workOrder',
        data: {
          workOrderNumber: 'WO-CSNAR9GU',
          manufacturingOrderId: 'mo-qSvM0yT1',
          workCenterId: 'wc-6BQeXT5P',
          startDate: '2026-01-26T15:00:00.000Z',
          endDate: '2026-01-26T16:19:00.000Z',
          durationMinutes: 79,
          isMaintenance: false,
          dependsOnWorkOrderIds: [],
        },
      },
      {
        docId: 'wo-f6jsI90Z',
        docType: 'workOrder',
        data: {
          workOrderNumber: 'WO-VZOCODPE',
          manufacturingOrderId: 'mo-hMGVF7f3',
          workCenterId: 'wc-AW9VYiqJ',
          startDate: '2026-01-27T15:00:00.000Z',
          endDate: '2026-01-28T12:09:00.000Z',
          durationMinutes: 369,
          isMaintenance: false,
          dependsOnWorkOrderIds: [],
        },
      },
    ],
    workCenters: [
      {
        docId: 'wc-AW9VYiqJ',
        docType: 'workCenter',
        data: {
          name: 'Work Center 1',
          shifts: [
            {
              dayOfWeek: 1,
              startHour: 8,
              endHour: 17,
            },
            {
              dayOfWeek: 2,
              startHour: 8,
              endHour: 17,
            },
            {
              dayOfWeek: 3,
              startHour: 8,
              endHour: 17,
            },
            {
              dayOfWeek: 4,
              startHour: 8,
              endHour: 17,
            },
            {
              dayOfWeek: 5,
              startHour: 8,
              endHour: 17,
            },
          ],
          maintenanceWindows: [],
        },
      },
      {
        docId: 'wc-bXCkmv9E',
        docType: 'workCenter',
        data: {
          name: 'Work Center 2',
          shifts: [
            {
              dayOfWeek: 1,
              startHour: 8,
              endHour: 17,
            },
            {
              dayOfWeek: 2,
              startHour: 8,
              endHour: 17,
            },
            {
              dayOfWeek: 3,
              startHour: 8,
              endHour: 17,
            },
            {
              dayOfWeek: 4,
              startHour: 8,
              endHour: 17,
            },
            {
              dayOfWeek: 5,
              startHour: 8,
              endHour: 17,
            },
          ],
          maintenanceWindows: [],
        },
      },
      {
        docId: 'wc-xtLTXJbz',
        docType: 'workCenter',
        data: {
          name: 'Work Center 3',
          shifts: [
            {
              dayOfWeek: 1,
              startHour: 8,
              endHour: 17,
            },
            {
              dayOfWeek: 2,
              startHour: 8,
              endHour: 17,
            },
            {
              dayOfWeek: 3,
              startHour: 8,
              endHour: 17,
            },
            {
              dayOfWeek: 4,
              startHour: 8,
              endHour: 17,
            },
            {
              dayOfWeek: 5,
              startHour: 8,
              endHour: 17,
            },
          ],
          maintenanceWindows: [
            {
              startDate: '2026-02-10T03:00:00.000Z',
              endDate: '2026-02-10T06:00:00.000Z',
              reason: 'Scheduled maintenance',
            },
          ],
        },
      },
      {
        docId: 'wc-6BQeXT5P',
        docType: 'workCenter',
        data: {
          name: 'Work Center 4',
          shifts: [
            {
              dayOfWeek: 1,
              startHour: 8,
              endHour: 17,
            },
            {
              dayOfWeek: 2,
              startHour: 8,
              endHour: 17,
            },
            {
              dayOfWeek: 3,
              startHour: 8,
              endHour: 17,
            },
            {
              dayOfWeek: 4,
              startHour: 8,
              endHour: 17,
            },
            {
              dayOfWeek: 5,
              startHour: 8,
              endHour: 17,
            },
          ],
          maintenanceWindows: [
            {
              startDate: '2026-02-02T12:00:00.000Z',
              endDate: '2026-02-02T15:00:00.000Z',
              reason: 'Safety inspection',
            },
          ],
        },
      },
    ],
    manufacturingOrders: [
      {
        docId: 'mo-Sb71MPFq',
        docType: 'manufacturingOrder',
        data: {
          manufacturingOrderNumber: 'MO-OAL7HBX3',
          itemId: 'ITEM-NUJIUS',
          quantity: 290,
          dueDate: '2026-01-29T15:45:16.917Z',
        },
      },
      {
        docId: 'mo-R6FG2bxQ',
        docType: 'manufacturingOrder',
        data: {
          manufacturingOrderNumber: 'MO-UAKUQKPV',
          itemId: 'ITEM-GZQ2CO',
          quantity: 796,
          dueDate: '2026-02-28T15:45:16.917Z',
        },
      },
      {
        docId: 'mo-Zznw9yxt',
        docType: 'manufacturingOrder',
        data: {
          manufacturingOrderNumber: 'MO-N9HJRMHL',
          itemId: 'ITEM-QFOPU9',
          quantity: 543,
          dueDate: '2026-03-02T15:45:16.917Z',
        },
      },
      {
        docId: 'mo-fiIeVFMy',
        docType: 'manufacturingOrder',
        data: {
          manufacturingOrderNumber: 'MO-YAGDHPGH',
          itemId: 'ITEM-PBBNJV',
          quantity: 674,
          dueDate: '2026-02-15T15:45:16.917Z',
        },
      },
      {
        docId: 'mo-ANGnqLPO',
        docType: 'manufacturingOrder',
        data: {
          manufacturingOrderNumber: 'MO-W5JSJLSA',
          itemId: 'ITEM-TYEO2K',
          quantity: 919,
          dueDate: '2026-02-28T15:45:16.917Z',
        },
      },
      {
        docId: 'mo-hMGVF7f3',
        docType: 'manufacturingOrder',
        data: {
          manufacturingOrderNumber: 'MO-FSOLUCI3',
          itemId: 'ITEM-NPNGJB',
          quantity: 160,
          dueDate: '2026-03-23T15:45:16.917Z',
        },
      },
      {
        docId: 'mo-VOSdTMxt',
        docType: 'manufacturingOrder',
        data: {
          manufacturingOrderNumber: 'MO-F53HFAUJ',
          itemId: 'ITEM-PQ8ZPX',
          quantity: 258,
          dueDate: '2026-02-02T15:45:16.917Z',
        },
      },
      {
        docId: 'mo-cdRdOKfD',
        docType: 'manufacturingOrder',
        data: {
          manufacturingOrderNumber: 'MO-3W04YOM2',
          itemId: 'ITEM-V7JEHF',
          quantity: 510,
          dueDate: '2026-02-06T15:45:16.917Z',
        },
      },
      {
        docId: 'mo-qSvM0yT1',
        docType: 'manufacturingOrder',
        data: {
          manufacturingOrderNumber: 'MO-VA1UTJNL',
          itemId: 'ITEM-DTZKVR',
          quantity: 613,
          dueDate: '2026-02-27T15:45:16.917Z',
        },
      },
      {
        docId: 'mo-Lri8ThNn',
        docType: 'manufacturingOrder',
        data: {
          manufacturingOrderNumber: 'MO-4TRJCR9M',
          itemId: 'ITEM-M1WYNO',
          quantity: 809,
          dueDate: '2026-02-02T15:45:16.917Z',
        },
      },
      {
        docId: 'mo-RbmSJcxD',
        docType: 'manufacturingOrder',
        data: {
          manufacturingOrderNumber: 'MO-BDMQ5IE7',
          itemId: 'ITEM-HQ8XEK',
          quantity: 774,
          dueDate: '2026-03-21T15:45:16.917Z',
        },
      },
    ],
  },

  {
    workOrders: [
      {
        docId: 'wo-R0TTEaGL',
        docType: 'workOrder',
        data: {
          workOrderNumber: 'WO-GM9TQ9HA',
          manufacturingOrderId: 'mo-wEhoCDin',
          workCenterId: 'wc-3MfPZoyd',
          startDate: '2026-02-02T08:00:00.000Z',
          endDate: '2026-02-02T09:16:00.000Z',
          durationMinutes: 76,
          isMaintenance: false,
          dependsOnWorkOrderIds: [],
        },
      },
      {
        docId: 'wo-G3LupDZZ',
        docType: 'workOrder',
        data: {
          workOrderNumber: 'WO-WYRUQNPB',
          manufacturingOrderId: 'mo-fhMth7Rn',
          workCenterId: 'wc-3MfPZoyd',
          startDate: '2026-01-27T15:00:00.000Z',
          endDate: '2026-01-28T13:30:00.000Z',
          durationMinutes: 450,
          isMaintenance: false,
          dependsOnWorkOrderIds: [
            'wo-R0TTEaGL',
          ],
        },
      },
      {
        docId: 'wo-p7u1brft',
        docType: 'workOrder',
        data: {
          workOrderNumber: 'WO-DSPBFMTT',
          manufacturingOrderId: 'mo-4poUxMGK',
          workCenterId: 'wc-FsuqJBPQ',
          startDate: '2026-01-23T15:00:00.000Z',
          endDate: '2026-01-26T11:51:00.000Z',
          durationMinutes: 351,
          isMaintenance: false,
          dependsOnWorkOrderIds: [],
        },
      },
      {
        docId: 'wo-e6H0uc2C',
        docType: 'workOrder',
        data: {
          workOrderNumber: 'WO-XC7KIKQP',
          manufacturingOrderId: 'mo-glh90y6L',
          workCenterId: 'wc-1vJosOrb',
          startDate: '2026-02-04T15:00:00.000Z',
          endDate: '2026-02-05T13:19:00.000Z',
          durationMinutes: 439,
          isMaintenance: false,
          dependsOnWorkOrderIds: [],
        },
      },
      {
        docId: 'wo-8g51zJIz',
        docType: 'workOrder',
        data: {
          workOrderNumber: 'WO-WYYRXC85',
          manufacturingOrderId: 'mo-glh90y6L',
          workCenterId: 'wc-3MfPZoyd',
          startDate: '2026-01-29T15:00:00.000Z',
          endDate: '2026-01-29T16:58:00.000Z',
          durationMinutes: 118,
          isMaintenance: false,
          dependsOnWorkOrderIds: [],
        },
      },
      {
        docId: 'wo-0NTxNlrz',
        docType: 'workOrder',
        data: {
          workOrderNumber: 'WO-R6B7XIAD',
          manufacturingOrderId: 'mo-fhMth7Rn',
          workCenterId: 'wc-3MfPZoyd',
          startDate: '2026-01-22T15:00:00.000Z',
          endDate: '2026-01-23T09:07:00.000Z',
          durationMinutes: 187,
          isMaintenance: false,
          dependsOnWorkOrderIds: [
            'wo-R0TTEaGL',
            'wo-p7u1brft',
          ],
        },
      },
      {
        docId: 'wo-wwPL1ENJ',
        docType: 'workOrder',
        data: {
          workOrderNumber: 'WO-M3UMRSPR',
          manufacturingOrderId: 'mo-no0ylDjT',
          workCenterId: 'wc-3MfPZoyd',
          startDate: '2026-02-02T08:00:00.000Z',
          endDate: '2026-02-02T08:31:00.000Z',
          durationMinutes: 31,
          isMaintenance: false,
          dependsOnWorkOrderIds: [],
        },
      },
      {
        docId: 'wo-VtWloIXw',
        docType: 'workOrder',
        data: {
          workOrderNumber: 'WO-HHE7AFWP',
          manufacturingOrderId: 'mo-7QAa7KBs',
          workCenterId: 'wc-3MfPZoyd',
          startDate: '2026-01-26T08:00:00.000Z',
          endDate: '2026-01-26T11:42:00.000Z',
          durationMinutes: 222,
          isMaintenance: false,
          dependsOnWorkOrderIds: [
            'wo-p7u1brft',
          ],
        },
      },
      {
        docId: 'wo-DwI0v8va',
        docType: 'workOrder',
        data: {
          workOrderNumber: 'WO-OG0Z195F',
          manufacturingOrderId: 'mo-no0ylDjT',
          workCenterId: 'wc-bySvwlF6',
          startDate: '2026-01-22T15:00:00.000Z',
          endDate: '2026-01-23T10:51:00.000Z',
          durationMinutes: 291,
          isMaintenance: false,
          dependsOnWorkOrderIds: [],
        },
      },
      {
        docId: 'wo-7sAzxTXj',
        docType: 'workOrder',
        data: {
          workOrderNumber: 'WO-CFHEGGV5',
          manufacturingOrderId: 'mo-fhMth7Rn',
          workCenterId: 'wc-1vJosOrb',
          startDate: '2026-02-03T15:00:00.000Z',
          endDate: '2026-02-04T12:44:00.000Z',
          durationMinutes: 404,
          isMaintenance: false,
          dependsOnWorkOrderIds: [],
        },
      },
    ],
    workCenters: [
      {
        docId: 'wc-FsuqJBPQ',
        docType: 'workCenter',
        data: {
          name: 'Work Center 1',
          shifts: [
            {
              dayOfWeek: 1,
              startHour: 8,
              endHour: 17,
            },
            {
              dayOfWeek: 2,
              startHour: 8,
              endHour: 17,
            },
            {
              dayOfWeek: 3,
              startHour: 8,
              endHour: 17,
            },
            {
              dayOfWeek: 4,
              startHour: 8,
              endHour: 17,
            },
            {
              dayOfWeek: 5,
              startHour: 8,
              endHour: 17,
            },
          ],
          maintenanceWindows: [
            {
              startDate: '2026-02-14T03:00:00.000Z',
              endDate: '2026-02-14T07:00:00.000Z',
              reason: 'Scheduled maintenance',
            },
          ],
        },
      },
      {
        docId: 'wc-3MfPZoyd',
        docType: 'workCenter',
        data: {
          name: 'Work Center 2',
          shifts: [
            {
              dayOfWeek: 1,
              startHour: 8,
              endHour: 17,
            },
            {
              dayOfWeek: 2,
              startHour: 8,
              endHour: 17,
            },
            {
              dayOfWeek: 3,
              startHour: 8,
              endHour: 17,
            },
            {
              dayOfWeek: 4,
              startHour: 8,
              endHour: 17,
            },
            {
              dayOfWeek: 5,
              startHour: 8,
              endHour: 17,
            },
          ],
          maintenanceWindows: [
            {
              startDate: '2026-02-19T04:00:00.000Z',
              endDate: '2026-02-19T11:00:00.000Z',
              reason: 'Equipment repair',
            },
          ],
        },
      },
      {
        docId: 'wc-1vJosOrb',
        docType: 'workCenter',
        data: {
          name: 'Work Center 3',
          shifts: [
            {
              dayOfWeek: 1,
              startHour: 8,
              endHour: 17,
            },
            {
              dayOfWeek: 2,
              startHour: 8,
              endHour: 17,
            },
            {
              dayOfWeek: 3,
              startHour: 8,
              endHour: 17,
            },
            {
              dayOfWeek: 4,
              startHour: 8,
              endHour: 17,
            },
            {
              dayOfWeek: 5,
              startHour: 8,
              endHour: 17,
            },
          ],
          maintenanceWindows: [],
        },
      },
      {
        docId: 'wc-bySvwlF6',
        docType: 'workCenter',
        data: {
          name: 'Work Center 4',
          shifts: [
            {
              dayOfWeek: 1,
              startHour: 8,
              endHour: 17,
            },
            {
              dayOfWeek: 2,
              startHour: 8,
              endHour: 17,
            },
            {
              dayOfWeek: 3,
              startHour: 8,
              endHour: 17,
            },
            {
              dayOfWeek: 4,
              startHour: 8,
              endHour: 17,
            },
            {
              dayOfWeek: 5,
              startHour: 8,
              endHour: 17,
            },
          ],
          maintenanceWindows: [],
        },
      },
    ],
    manufacturingOrders: [
      {
        docId: 'mo-ZtDMV7bl',
        docType: 'manufacturingOrder',
        data: {
          manufacturingOrderNumber: 'MO-BT2DUX46',
          itemId: 'ITEM-TZ2D8F',
          quantity: 193,
          dueDate: '2026-02-04T15:45:16.918Z',
        },
      },
      {
        docId: 'mo-glh90y6L',
        docType: 'manufacturingOrder',
        data: {
          manufacturingOrderNumber: 'MO-45PXOAUI',
          itemId: 'ITEM-9KU6LS',
          quantity: 783,
          dueDate: '2026-02-25T15:45:16.918Z',
        },
      },
      {
        docId: 'mo-0sk3szR9',
        docType: 'manufacturingOrder',
        data: {
          manufacturingOrderNumber: 'MO-CPPPTRK2',
          itemId: 'ITEM-RHTU6T',
          quantity: 745,
          dueDate: '2026-02-10T15:45:16.918Z',
        },
      },
      {
        docId: 'mo-7QAa7KBs',
        docType: 'manufacturingOrder',
        data: {
          manufacturingOrderNumber: 'MO-ULLVPTDU',
          itemId: 'ITEM-HZ1BES',
          quantity: 356,
          dueDate: '2026-03-23T15:45:16.918Z',
        },
      },
      {
        docId: 'mo-1L6Wh88y',
        docType: 'manufacturingOrder',
        data: {
          manufacturingOrderNumber: 'MO-TMFGOOYH',
          itemId: 'ITEM-HWLZ4F',
          quantity: 92,
          dueDate: '2026-02-11T15:45:16.918Z',
        },
      },
      {
        docId: 'mo-fhMth7Rn',
        docType: 'manufacturingOrder',
        data: {
          manufacturingOrderNumber: 'MO-ZA70RJXW',
          itemId: 'ITEM-XMCQG7',
          quantity: 676,
          dueDate: '2026-03-13T15:45:16.918Z',
        },
      },
      {
        docId: 'mo-4poUxMGK',
        docType: 'manufacturingOrder',
        data: {
          manufacturingOrderNumber: 'MO-R7XUHZ5M',
          itemId: 'ITEM-GYTXGK',
          quantity: 746,
          dueDate: '2026-03-01T15:45:16.918Z',
        },
      },
      {
        docId: 'mo-wEhoCDin',
        docType: 'manufacturingOrder',
        data: {
          manufacturingOrderNumber: 'MO-1JMO8SPC',
          itemId: 'ITEM-W9VRFR',
          quantity: 349,
          dueDate: '2026-02-08T15:45:16.918Z',
        },
      },
      {
        docId: 'mo-no0ylDjT',
        docType: 'manufacturingOrder',
        data: {
          manufacturingOrderNumber: 'MO-NCXVWRNJ',
          itemId: 'ITEM-YO4W1T',
          quantity: 505,
          dueDate: '2026-03-16T15:45:16.918Z',
        },
      },
      {
        docId: 'mo-xxDma7KO',
        docType: 'manufacturingOrder',
        data: {
          manufacturingOrderNumber: 'MO-NUVIBY0A',
          itemId: 'ITEM-6OMUG2',
          quantity: 34,
          dueDate: '2026-02-04T15:45:16.918Z',
        },
      },
      {
        docId: 'mo-9WKR6EkP',
        docType: 'manufacturingOrder',
        data: {
          manufacturingOrderNumber: 'MO-XPDDFJJX',
          itemId: 'ITEM-4XOJL0',
          quantity: 27,
          dueDate: '2026-03-19T15:45:16.918Z',
        },
      },
    ],
  },
]
