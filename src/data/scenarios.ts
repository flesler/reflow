import type { Scenario } from 'src/reflow/types'

export const scenarios: Scenario[] = [
  {
    workOrders: [
      {
        docId: 'wo-RHKNudXH',
        docType: 'workOrder',
        data: {
          workOrderNumber: 'WO-FMRWZIGK',
          manufacturingOrderId: 'mo-fER1NJTs',
          workCenterId: 'wc-ZL7l3wBi',
          startDate: '2026-02-02T08:00:00.000Z',
          endDate: '2026-02-02T08:57:00.000Z',
          durationMinutes: 57,
          isMaintenance: false,
          dependsOnWorkOrderIds: [],
        },
      },
      {
        docId: 'wo-Yo5XTqCL',
        docType: 'workOrder',
        data: {
          workOrderNumber: 'WO-XRTDL4IG',
          manufacturingOrderId: 'mo-d8hvvdYs',
          workCenterId: 'wc-uqYys2Cx',
          startDate: '2026-02-06T14:00:00.000Z',
          endDate: '2026-02-09T11:52:00.000Z',
          durationMinutes: 412,
          isMaintenance: false,
          dependsOnWorkOrderIds: [],
        },
      },
      {
        docId: 'wo-3MJkRr3E',
        docType: 'workOrder',
        data: {
          workOrderNumber: 'WO-3INC91A7',
          manufacturingOrderId: 'mo-PRm5PhqK',
          workCenterId: 'wc-WWzRpxhK',
          startDate: '2026-02-05T14:00:00.000Z',
          endDate: '2026-02-06T12:00:00.000Z',
          durationMinutes: 420,
          isMaintenance: false,
          dependsOnWorkOrderIds: [
            'wo-RHKNudXH',
            'wo-Yo5XTqCL',
          ],
        },
      },
      {
        docId: 'wo-xjn788J2',
        docType: 'workOrder',
        data: {
          workOrderNumber: 'WO-AFIPMXCI',
          manufacturingOrderId: 'mo-bFRZFcqc',
          workCenterId: 'wc-dY2YjwBG',
          startDate: '2026-02-05T14:00:00.000Z',
          endDate: '2026-02-05T16:29:00.000Z',
          durationMinutes: 149,
          isMaintenance: false,
          dependsOnWorkOrderIds: [
            'wo-RHKNudXH',
          ],
        },
      },
      {
        docId: 'wo-JD8KsKzG',
        docType: 'workOrder',
        data: {
          workOrderNumber: 'WO-3UYRLDAD',
          manufacturingOrderId: 'mo-Z6uXIQLG',
          workCenterId: 'wc-bkf8J2G7',
          startDate: '2026-02-02T08:00:00.000Z',
          endDate: '2026-02-02T15:28:00.000Z',
          durationMinutes: 448,
          isMaintenance: false,
          dependsOnWorkOrderIds: [],
        },
      },
      {
        docId: 'wo-3iX2Q9Sr',
        docType: 'workOrder',
        data: {
          workOrderNumber: 'WO-E6C5YSHJ',
          manufacturingOrderId: 'mo-fER1NJTs',
          workCenterId: 'wc-dY2YjwBG',
          startDate: '2026-02-02T08:00:00.000Z',
          endDate: '2026-02-02T10:13:00.000Z',
          durationMinutes: 133,
          isMaintenance: false,
          dependsOnWorkOrderIds: [],
        },
      },
      {
        docId: 'wo-pOYCOeHv',
        docType: 'workOrder',
        data: {
          workOrderNumber: 'WO-UO7UJTFC',
          manufacturingOrderId: 'mo-DZKXz0a9',
          workCenterId: 'wc-dY2YjwBG',
          startDate: '2026-02-05T14:00:00.000Z',
          endDate: '2026-02-06T11:51:00.000Z',
          durationMinutes: 411,
          isMaintenance: false,
          dependsOnWorkOrderIds: [],
        },
      },
      {
        docId: 'wo-Q97sEBZ1',
        docType: 'workOrder',
        data: {
          workOrderNumber: 'WO-TPYSWQSU',
          manufacturingOrderId: 'mo-PRm5PhqK',
          workCenterId: 'wc-ZL7l3wBi',
          startDate: '2026-02-06T14:00:00.000Z',
          endDate: '2026-02-09T08:36:00.000Z',
          durationMinutes: 216,
          isMaintenance: false,
          dependsOnWorkOrderIds: [],
        },
      },
      {
        docId: 'wo-qHdUH7Ie',
        docType: 'workOrder',
        data: {
          workOrderNumber: 'WO-9SCA3AYJ',
          manufacturingOrderId: 'mo-bFRZFcqc',
          workCenterId: 'wc-bkf8J2G7',
          startDate: '2026-02-02T08:00:00.000Z',
          endDate: '2026-02-02T13:24:00.000Z',
          durationMinutes: 324,
          isMaintenance: false,
          dependsOnWorkOrderIds: [],
        },
      },
      {
        docId: 'wo-ELQYmMgv',
        docType: 'workOrder',
        data: {
          workOrderNumber: 'WO-SNIIYAVJ',
          manufacturingOrderId: 'mo-DZKXz0a9',
          workCenterId: 'wc-bkf8J2G7',
          startDate: '2026-02-04T14:00:00.000Z',
          endDate: '2026-02-05T12:08:00.000Z',
          durationMinutes: 428,
          isMaintenance: false,
          dependsOnWorkOrderIds: [
            'wo-pOYCOeHv',
          ],
        },
      },
    ],
    workCenters: [
      {
        docId: 'wc-bkf8J2G7',
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
              startDate: '2026-01-29T08:00:00.000Z',
              endDate: '2026-01-29T16:00:00.000Z',
              reason: 'Equipment repair',
            },
          ],
        },
      },
      {
        docId: 'wc-WWzRpxhK',
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
              startDate: '2026-01-28T07:00:00.000Z',
              endDate: '2026-01-28T10:00:00.000Z',
              reason: 'Equipment repair',
            },
          ],
        },
      },
      {
        docId: 'wc-ZL7l3wBi',
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
        docId: 'wc-uqYys2Cx',
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
              startDate: '2026-01-31T12:00:00.000Z',
              endDate: '2026-01-31T15:00:00.000Z',
              reason: 'Equipment repair',
            },
          ],
        },
      },
      {
        docId: 'wc-dY2YjwBG',
        docType: 'workCenter',
        data: {
          name: 'Work Center 5',
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
              startDate: '2026-02-18T10:00:00.000Z',
              endDate: '2026-02-18T14:00:00.000Z',
              reason: 'Safety inspection',
            },
          ],
        },
      },
    ],
    manufacturingOrders: [
      {
        docId: 'mo-9fXugtV1',
        docType: 'manufacturingOrder',
        data: {
          manufacturingOrderNumber: 'MO-IL7BLOYL',
          itemId: 'ITEM-VHYA4Z',
          quantity: 452,
          dueDate: '2026-03-02T14:31:55.391Z',
        },
      },
      {
        docId: 'mo-bFRZFcqc',
        docType: 'manufacturingOrder',
        data: {
          manufacturingOrderNumber: 'MO-JPRABPKN',
          itemId: 'ITEM-WRNRVP',
          quantity: 787,
          dueDate: '2026-03-07T14:31:55.391Z',
        },
      },
      {
        docId: 'mo-HWxbe3WM',
        docType: 'manufacturingOrder',
        data: {
          manufacturingOrderNumber: 'MO-MFY17Q1R',
          itemId: 'ITEM-KIDSLH',
          quantity: 868,
          dueDate: '2026-03-18T14:31:55.391Z',
        },
      },
      {
        docId: 'mo-wnodrRuT',
        docType: 'manufacturingOrder',
        data: {
          manufacturingOrderNumber: 'MO-K0PHRYBQ',
          itemId: 'ITEM-CN8UYQ',
          quantity: 32,
          dueDate: '2026-02-28T14:31:55.391Z',
        },
      },
      {
        docId: 'mo-aytMQmJd',
        docType: 'manufacturingOrder',
        data: {
          manufacturingOrderNumber: 'MO-FKX2BRLT',
          itemId: 'ITEM-UMQBEJ',
          quantity: 141,
          dueDate: '2026-03-18T14:31:55.391Z',
        },
      },
      {
        docId: 'mo-d8hvvdYs',
        docType: 'manufacturingOrder',
        data: {
          manufacturingOrderNumber: 'MO-8OSWXZL4',
          itemId: 'ITEM-LNCZ88',
          quantity: 815,
          dueDate: '2026-03-26T14:31:55.391Z',
        },
      },
      {
        docId: 'mo-PRm5PhqK',
        docType: 'manufacturingOrder',
        data: {
          manufacturingOrderNumber: 'MO-KUWCBIF8',
          itemId: 'ITEM-9ARULP',
          quantity: 855,
          dueDate: '2026-03-18T14:31:55.391Z',
        },
      },
      {
        docId: 'mo-fER1NJTs',
        docType: 'manufacturingOrder',
        data: {
          manufacturingOrderNumber: 'MO-XKTLUW74',
          itemId: 'ITEM-2UIRUL',
          quantity: 124,
          dueDate: '2026-03-20T14:31:55.392Z',
        },
      },
      {
        docId: 'mo-QEnft1cC',
        docType: 'manufacturingOrder',
        data: {
          manufacturingOrderNumber: 'MO-ODNFEUHP',
          itemId: 'ITEM-X2I4DE',
          quantity: 17,
          dueDate: '2026-02-24T14:31:55.392Z',
        },
      },
      {
        docId: 'mo-kT1SCfp3',
        docType: 'manufacturingOrder',
        data: {
          manufacturingOrderNumber: 'MO-VIQXNUWZ',
          itemId: 'ITEM-VMHENM',
          quantity: 712,
          dueDate: '2026-02-07T14:31:55.392Z',
        },
      },
      {
        docId: 'mo-DZKXz0a9',
        docType: 'manufacturingOrder',
        data: {
          manufacturingOrderNumber: 'MO-CYFBDWER',
          itemId: 'ITEM-7BKM7J',
          quantity: 692,
          dueDate: '2026-02-25T14:31:55.392Z',
        },
      },
      {
        docId: 'mo-Z6uXIQLG',
        docType: 'manufacturingOrder',
        data: {
          manufacturingOrderNumber: 'MO-XI4WCM9L',
          itemId: 'ITEM-OXVGMP',
          quantity: 746,
          dueDate: '2026-02-03T14:31:55.392Z',
        },
      },
      {
        docId: 'mo-EzgQl03r',
        docType: 'manufacturingOrder',
        data: {
          manufacturingOrderNumber: 'MO-9H3HD2ZA',
          itemId: 'ITEM-DBFEO6',
          quantity: 739,
          dueDate: '2026-03-09T14:31:55.392Z',
        },
      },
      {
        docId: 'mo-sSERyPob',
        docType: 'manufacturingOrder',
        data: {
          manufacturingOrderNumber: 'MO-RLYR6SEY',
          itemId: 'ITEM-4GN1US',
          quantity: 531,
          dueDate: '2026-02-06T14:31:55.392Z',
        },
      },
    ],
  },

  {
    workOrders: [
      {
        docId: 'wo-h8gSl2P4',
        docType: 'workOrder',
        data: {
          workOrderNumber: 'WO-5GQKK937',
          manufacturingOrderId: 'mo-m5yR1XGZ',
          workCenterId: 'wc-XVjGphzU',
          startDate: '2026-02-02T08:00:00.000Z',
          endDate: '2026-02-02T10:33:00.000Z',
          durationMinutes: 153,
          isMaintenance: true,
          dependsOnWorkOrderIds: [],
        },
      },
      {
        docId: 'wo-vYhECv1O',
        docType: 'workOrder',
        data: {
          workOrderNumber: 'WO-TZBORU7B',
          manufacturingOrderId: 'mo-GZZ8v8CA',
          workCenterId: 'wc-XVjGphzU',
          startDate: '2026-02-02T14:00:00.000Z',
          endDate: '2026-02-03T11:22:00.000Z',
          durationMinutes: 382,
          isMaintenance: false,
          dependsOnWorkOrderIds: [
            'wo-h8gSl2P4',
          ],
        },
      },
      {
        docId: 'wo-n0pPsUTm',
        docType: 'workOrder',
        data: {
          workOrderNumber: 'WO-C9YZS2YK',
          manufacturingOrderId: 'mo-IFbaBl3p',
          workCenterId: 'wc-lQar6WdW',
          startDate: '2026-02-09T14:00:00.000Z',
          endDate: '2026-02-10T11:24:00.000Z',
          durationMinutes: 384,
          isMaintenance: false,
          dependsOnWorkOrderIds: [
            'wo-h8gSl2P4',
          ],
        },
      },
      {
        docId: 'wo-qHJozAHW',
        docType: 'workOrder',
        data: {
          workOrderNumber: 'WO-H0HK4CRJ',
          manufacturingOrderId: 'mo-goj3hwnz',
          workCenterId: 'wc-XVjGphzU',
          startDate: '2026-02-02T14:00:00.000Z',
          endDate: '2026-02-02T15:26:00.000Z',
          durationMinutes: 86,
          isMaintenance: false,
          dependsOnWorkOrderIds: [
            'wo-vYhECv1O',
            'wo-h8gSl2P4',
          ],
        },
      },
      {
        docId: 'wo-sfDxD56i',
        docType: 'workOrder',
        data: {
          workOrderNumber: 'WO-MLRCRQ3D',
          manufacturingOrderId: 'mo-BkbBugn8',
          workCenterId: 'wc-lQar6WdW',
          startDate: '2026-01-26T14:00:00.000Z',
          endDate: '2026-01-27T11:21:00.000Z',
          durationMinutes: 381,
          isMaintenance: false,
          dependsOnWorkOrderIds: [],
        },
      },
      {
        docId: 'wo-UTifAhli',
        docType: 'workOrder',
        data: {
          workOrderNumber: 'WO-AYJIE1BL',
          manufacturingOrderId: 'mo-sqfqMASa',
          workCenterId: 'wc-XVjGphzU',
          startDate: '2026-02-06T14:00:00.000Z',
          endDate: '2026-02-09T11:57:00.000Z',
          durationMinutes: 417,
          isMaintenance: false,
          dependsOnWorkOrderIds: [
            'wo-vYhECv1O',
            'wo-h8gSl2P4',
          ],
        },
      },
      {
        docId: 'wo-N0N3TDBU',
        docType: 'workOrder',
        data: {
          workOrderNumber: 'WO-X0C184QE',
          manufacturingOrderId: 'mo-GZZ8v8CA',
          workCenterId: 'wc-XVjGphzU',
          startDate: '2026-02-02T08:00:00.000Z',
          endDate: '2026-02-02T14:11:00.000Z',
          durationMinutes: 371,
          isMaintenance: false,
          dependsOnWorkOrderIds: [
            'wo-n0pPsUTm',
            'wo-vYhECv1O',
            'wo-qHJozAHW',
          ],
        },
      },
      {
        docId: 'wo-TbX3GkGP',
        docType: 'workOrder',
        data: {
          workOrderNumber: 'WO-UZTZVH51',
          manufacturingOrderId: 'mo-BkbBugn8',
          workCenterId: 'wc-lQar6WdW',
          startDate: '2026-02-03T14:00:00.000Z',
          endDate: '2026-02-03T15:07:00.000Z',
          durationMinutes: 67,
          isMaintenance: false,
          dependsOnWorkOrderIds: [
            'wo-sfDxD56i',
            'wo-UTifAhli',
          ],
        },
      },
      {
        docId: 'wo-rldFqkgC',
        docType: 'workOrder',
        data: {
          workOrderNumber: 'WO-MEEG18Y3',
          manufacturingOrderId: 'mo-KTUCZjLa',
          workCenterId: 'wc-XVjGphzU',
          startDate: '2026-01-26T14:00:00.000Z',
          endDate: '2026-01-27T12:59:00.000Z',
          durationMinutes: 479,
          isMaintenance: false,
          dependsOnWorkOrderIds: [],
        },
      },
      {
        docId: 'wo-JsRsuFuw',
        docType: 'workOrder',
        data: {
          workOrderNumber: 'WO-CHUGOQNC',
          manufacturingOrderId: 'mo-m5yR1XGZ',
          workCenterId: 'wc-lQar6WdW',
          startDate: '2026-02-09T08:00:00.000Z',
          endDate: '2026-02-09T13:05:00.000Z',
          durationMinutes: 305,
          isMaintenance: false,
          dependsOnWorkOrderIds: [
            'wo-vYhECv1O',
          ],
        },
      },
    ],
    workCenters: [
      {
        docId: 'wc-XVjGphzU',
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
        docId: 'wc-lQar6WdW',
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
        docId: 'mo-GZZ8v8CA',
        docType: 'manufacturingOrder',
        data: {
          manufacturingOrderNumber: 'MO-JUTD1XV7',
          itemId: 'ITEM-W0B0NO',
          quantity: 693,
          dueDate: '2026-03-12T14:31:55.396Z',
        },
      },
      {
        docId: 'mo-KTUCZjLa',
        docType: 'manufacturingOrder',
        data: {
          manufacturingOrderNumber: 'MO-INLUT6YM',
          itemId: 'ITEM-VQORSG',
          quantity: 572,
          dueDate: '2026-02-03T14:31:55.396Z',
        },
      },
      {
        docId: 'mo-xifeYOAI',
        docType: 'manufacturingOrder',
        data: {
          manufacturingOrderNumber: 'MO-IRZBPZMX',
          itemId: 'ITEM-F8TLQZ',
          quantity: 362,
          dueDate: '2026-03-03T14:31:55.396Z',
        },
      },
      {
        docId: 'mo-rhoxdawe',
        docType: 'manufacturingOrder',
        data: {
          manufacturingOrderNumber: 'MO-KRO8NOUE',
          itemId: 'ITEM-CWO8EA',
          quantity: 492,
          dueDate: '2026-03-09T14:31:55.396Z',
        },
      },
      {
        docId: 'mo-U8dzuivG',
        docType: 'manufacturingOrder',
        data: {
          manufacturingOrderNumber: 'MO-RTPBYGFN',
          itemId: 'ITEM-CQASRH',
          quantity: 596,
          dueDate: '2026-03-01T14:31:55.396Z',
        },
      },
      {
        docId: 'mo-goj3hwnz',
        docType: 'manufacturingOrder',
        data: {
          manufacturingOrderNumber: 'MO-C1XFB05R',
          itemId: 'ITEM-KPIXCT',
          quantity: 262,
          dueDate: '2026-03-16T14:31:55.396Z',
        },
      },
      {
        docId: 'mo-jORsdIfm',
        docType: 'manufacturingOrder',
        data: {
          manufacturingOrderNumber: 'MO-ZSNHCUN9',
          itemId: 'ITEM-ODQNSN',
          quantity: 805,
          dueDate: '2026-02-21T14:31:55.396Z',
        },
      },
      {
        docId: 'mo-m5yR1XGZ',
        docType: 'manufacturingOrder',
        data: {
          manufacturingOrderNumber: 'MO-DPB44IPG',
          itemId: 'ITEM-CHYJBO',
          quantity: 455,
          dueDate: '2026-03-16T14:31:55.396Z',
        },
      },
      {
        docId: 'mo-ur13P5sl',
        docType: 'manufacturingOrder',
        data: {
          manufacturingOrderNumber: 'MO-9HK5BV4G',
          itemId: 'ITEM-TXXQBE',
          quantity: 413,
          dueDate: '2026-02-14T14:31:55.396Z',
        },
      },
      {
        docId: 'mo-BkbBugn8',
        docType: 'manufacturingOrder',
        data: {
          manufacturingOrderNumber: 'MO-IV3EYFWI',
          itemId: 'ITEM-RIP1YW',
          quantity: 328,
          dueDate: '2026-02-10T14:31:55.396Z',
        },
      },
      {
        docId: 'mo-xuyrNgS4',
        docType: 'manufacturingOrder',
        data: {
          manufacturingOrderNumber: 'MO-5DKA8P70',
          itemId: 'ITEM-Z0UEFW',
          quantity: 638,
          dueDate: '2026-02-10T14:31:55.396Z',
        },
      },
      {
        docId: 'mo-0lUIjIBJ',
        docType: 'manufacturingOrder',
        data: {
          manufacturingOrderNumber: 'MO-478G6RZS',
          itemId: 'ITEM-WKC5BH',
          quantity: 54,
          dueDate: '2026-03-14T14:31:55.397Z',
        },
      },
      {
        docId: 'mo-KeQaRgpE',
        docType: 'manufacturingOrder',
        data: {
          manufacturingOrderNumber: 'MO-1MFYFZQM',
          itemId: 'ITEM-8JST9X',
          quantity: 876,
          dueDate: '2026-02-04T14:31:55.397Z',
        },
      },
      {
        docId: 'mo-sqfqMASa',
        docType: 'manufacturingOrder',
        data: {
          manufacturingOrderNumber: 'MO-C6JLOILD',
          itemId: 'ITEM-BUTGC6',
          quantity: 310,
          dueDate: '2026-03-18T14:31:55.397Z',
        },
      },
      {
        docId: 'mo-IFbaBl3p',
        docType: 'manufacturingOrder',
        data: {
          manufacturingOrderNumber: 'MO-CQADU6UM',
          itemId: 'ITEM-O2MXRU',
          quantity: 850,
          dueDate: '2026-02-27T14:31:55.397Z',
        },
      },
      {
        docId: 'mo-C8advouA',
        docType: 'manufacturingOrder',
        data: {
          manufacturingOrderNumber: 'MO-OOO7XNCP',
          itemId: 'ITEM-B9D4KM',
          quantity: 370,
          dueDate: '2026-02-23T14:31:55.397Z',
        },
      },
    ],
  },

  {
    workOrders: [
      {
        docId: 'wo-1FBmMm5G',
        docType: 'workOrder',
        data: {
          workOrderNumber: 'WO-DDCLBLV8',
          manufacturingOrderId: 'mo-n3yHribA',
          workCenterId: 'wc-WbXPwcJZ',
          startDate: '2026-02-05T14:00:00.000Z',
          endDate: '2026-02-05T16:14:00.000Z',
          durationMinutes: 134,
          isMaintenance: false,
          dependsOnWorkOrderIds: [],
        },
      },
      {
        docId: 'wo-XRzvatEo',
        docType: 'workOrder',
        data: {
          workOrderNumber: 'WO-9PMIG9V3',
          manufacturingOrderId: 'mo-By9ypjUk',
          workCenterId: 'wc-Mq21JGjC',
          startDate: '2026-02-02T14:00:00.000Z',
          endDate: '2026-02-03T10:29:00.000Z',
          durationMinutes: 329,
          isMaintenance: true,
          dependsOnWorkOrderIds: [],
        },
      },
      {
        docId: 'wo-a9spLoNJ',
        docType: 'workOrder',
        data: {
          workOrderNumber: 'WO-A3MPYLT5',
          manufacturingOrderId: 'mo-ScIKMspI',
          workCenterId: 'wc-Mq21JGjC',
          startDate: '2026-02-04T14:00:00.000Z',
          endDate: '2026-02-05T10:55:00.000Z',
          durationMinutes: 355,
          isMaintenance: true,
          dependsOnWorkOrderIds: [],
        },
      },
      {
        docId: 'wo-DHmPr3ev',
        docType: 'workOrder',
        data: {
          workOrderNumber: 'WO-3WXX8IMI',
          manufacturingOrderId: 'mo-vnJLjC0m',
          workCenterId: 'wc-Mq21JGjC',
          startDate: '2026-02-09T14:00:00.000Z',
          endDate: '2026-02-10T11:35:00.000Z',
          durationMinutes: 395,
          isMaintenance: false,
          dependsOnWorkOrderIds: [],
        },
      },
      {
        docId: 'wo-SwBxaQku',
        docType: 'workOrder',
        data: {
          workOrderNumber: 'WO-YL9KXD8F',
          manufacturingOrderId: 'mo-Fl1w45jF',
          workCenterId: 'wc-WbXPwcJZ',
          startDate: '2026-02-06T14:00:00.000Z',
          endDate: '2026-02-09T12:46:00.000Z',
          durationMinutes: 466,
          isMaintenance: false,
          dependsOnWorkOrderIds: [
            'wo-1FBmMm5G',
            'wo-XRzvatEo',
            'wo-DHmPr3ev',
          ],
        },
      },
      {
        docId: 'wo-moZBfxgG',
        docType: 'workOrder',
        data: {
          workOrderNumber: 'WO-VYRZMHHN',
          manufacturingOrderId: 'mo-vnJLjC0m',
          workCenterId: 'wc-Mq21JGjC',
          startDate: '2026-01-26T14:00:00.000Z',
          endDate: '2026-01-26T15:31:00.000Z',
          durationMinutes: 91,
          isMaintenance: true,
          dependsOnWorkOrderIds: [],
        },
      },
      {
        docId: 'wo-lde3bl8P',
        docType: 'workOrder',
        data: {
          workOrderNumber: 'WO-ETUYKZZ4',
          manufacturingOrderId: 'mo-oD2pzWDB',
          workCenterId: 'wc-WbXPwcJZ',
          startDate: '2026-01-30T14:00:00.000Z',
          endDate: '2026-02-02T10:13:00.000Z',
          durationMinutes: 313,
          isMaintenance: false,
          dependsOnWorkOrderIds: [],
        },
      },
      {
        docId: 'wo-19c8Cs1C',
        docType: 'workOrder',
        data: {
          workOrderNumber: 'WO-MPVPMDWZ',
          manufacturingOrderId: 'mo-3rQ9J6qw',
          workCenterId: 'wc-WbXPwcJZ',
          startDate: '2026-02-06T14:00:00.000Z',
          endDate: '2026-02-06T15:53:00.000Z',
          durationMinutes: 113,
          isMaintenance: true,
          dependsOnWorkOrderIds: [],
        },
      },
      {
        docId: 'wo-kfZiZE5x',
        docType: 'workOrder',
        data: {
          workOrderNumber: 'WO-G5RFSA7H',
          manufacturingOrderId: 'mo-l0WQ5DrA',
          workCenterId: 'wc-Mq21JGjC',
          startDate: '2026-01-29T14:00:00.000Z',
          endDate: '2026-01-30T11:38:00.000Z',
          durationMinutes: 398,
          isMaintenance: false,
          dependsOnWorkOrderIds: [
            'wo-DHmPr3ev',
          ],
        },
      },
      {
        docId: 'wo-0Uc0qwsi',
        docType: 'workOrder',
        data: {
          workOrderNumber: 'WO-Z7PAOOPX',
          manufacturingOrderId: 'mo-Fl1w45jF',
          workCenterId: 'wc-Mq21JGjC',
          startDate: '2026-02-02T14:00:00.000Z',
          endDate: '2026-02-03T12:57:00.000Z',
          durationMinutes: 477,
          isMaintenance: false,
          dependsOnWorkOrderIds: [],
        },
      },
    ],
    workCenters: [
      {
        docId: 'wc-Mq21JGjC',
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
              startDate: '2026-02-11T04:00:00.000Z',
              endDate: '2026-02-11T07:00:00.000Z',
              reason: 'Safety inspection',
            },
          ],
        },
      },
      {
        docId: 'wc-WbXPwcJZ',
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
              startDate: '2026-02-06T05:00:00.000Z',
              endDate: '2026-02-06T09:00:00.000Z',
              reason: 'Equipment repair',
            },
          ],
        },
      },
    ],
    manufacturingOrders: [
      {
        docId: 'mo-vnJLjC0m',
        docType: 'manufacturingOrder',
        data: {
          manufacturingOrderNumber: 'MO-XGMJ3MNG',
          itemId: 'ITEM-TJFJ3J',
          quantity: 29,
          dueDate: '2026-03-15T14:31:55.399Z',
        },
      },
      {
        docId: 'mo-n3yHribA',
        docType: 'manufacturingOrder',
        data: {
          manufacturingOrderNumber: 'MO-IWPEJH2E',
          itemId: 'ITEM-3P6CHF',
          quantity: 682,
          dueDate: '2026-03-03T14:31:55.399Z',
        },
      },
      {
        docId: 'mo-ScIKMspI',
        docType: 'manufacturingOrder',
        data: {
          manufacturingOrderNumber: 'MO-TYG1ASMN',
          itemId: 'ITEM-L5KSX8',
          quantity: 707,
          dueDate: '2026-02-18T14:31:55.399Z',
        },
      },
      {
        docId: 'mo-KKdVtSaj',
        docType: 'manufacturingOrder',
        data: {
          manufacturingOrderNumber: 'MO-ZKLNCW98',
          itemId: 'ITEM-F0GUUK',
          quantity: 475,
          dueDate: '2026-02-02T14:31:55.399Z',
        },
      },
      {
        docId: 'mo-3rQ9J6qw',
        docType: 'manufacturingOrder',
        data: {
          manufacturingOrderNumber: 'MO-DSZCO7Q8',
          itemId: 'ITEM-CA8P2X',
          quantity: 746,
          dueDate: '2026-03-19T14:31:55.399Z',
        },
      },
      {
        docId: 'mo-tybIVzAI',
        docType: 'manufacturingOrder',
        data: {
          manufacturingOrderNumber: 'MO-GFLOP4WH',
          itemId: 'ITEM-CB75YK',
          quantity: 136,
          dueDate: '2026-03-13T14:31:55.399Z',
        },
      },
      {
        docId: 'mo-Fl1w45jF',
        docType: 'manufacturingOrder',
        data: {
          manufacturingOrderNumber: 'MO-QMFS7YOR',
          itemId: 'ITEM-ESEM7D',
          quantity: 624,
          dueDate: '2026-03-16T14:31:55.399Z',
        },
      },
      {
        docId: 'mo-ujm73fTE',
        docType: 'manufacturingOrder',
        data: {
          manufacturingOrderNumber: 'MO-0ZBWRAPD',
          itemId: 'ITEM-MLITQZ',
          quantity: 384,
          dueDate: '2026-03-12T14:31:55.399Z',
        },
      },
      {
        docId: 'mo-UD4CN0ge',
        docType: 'manufacturingOrder',
        data: {
          manufacturingOrderNumber: 'MO-HTNLFKJ0',
          itemId: 'ITEM-5Y2PKX',
          quantity: 189,
          dueDate: '2026-03-22T14:31:55.400Z',
        },
      },
      {
        docId: 'mo-oq0S48Ny',
        docType: 'manufacturingOrder',
        data: {
          manufacturingOrderNumber: 'MO-MI2G8YTI',
          itemId: 'ITEM-PHIKE1',
          quantity: 422,
          dueDate: '2026-03-16T14:31:55.400Z',
        },
      },
      {
        docId: 'mo-By9ypjUk',
        docType: 'manufacturingOrder',
        data: {
          manufacturingOrderNumber: 'MO-3PJC3EAD',
          itemId: 'ITEM-QUKYA7',
          quantity: 382,
          dueDate: '2026-03-27T14:31:55.400Z',
        },
      },
      {
        docId: 'mo-cOmygCNH',
        docType: 'manufacturingOrder',
        data: {
          manufacturingOrderNumber: 'MO-VUIFK8J1',
          itemId: 'ITEM-JQWKWH',
          quantity: 268,
          dueDate: '2026-03-07T14:31:55.400Z',
        },
      },
      {
        docId: 'mo-oD2pzWDB',
        docType: 'manufacturingOrder',
        data: {
          manufacturingOrderNumber: 'MO-6VJC4KKJ',
          itemId: 'ITEM-B9DKNR',
          quantity: 387,
          dueDate: '2026-03-17T14:31:55.400Z',
        },
      },
      {
        docId: 'mo-l0WQ5DrA',
        docType: 'manufacturingOrder',
        data: {
          manufacturingOrderNumber: 'MO-G7TIFHHW',
          itemId: 'ITEM-GTHWTA',
          quantity: 979,
          dueDate: '2026-02-03T14:31:55.400Z',
        },
      },
      {
        docId: 'mo-sgdBNiNC',
        docType: 'manufacturingOrder',
        data: {
          manufacturingOrderNumber: 'MO-EZW98NAI',
          itemId: 'ITEM-FV5P1F',
          quantity: 377,
          dueDate: '2026-03-09T14:31:55.400Z',
        },
      },
      {
        docId: 'mo-W3okPtsu',
        docType: 'manufacturingOrder',
        data: {
          manufacturingOrderNumber: 'MO-KEM3VQVE',
          itemId: 'ITEM-B9IA99',
          quantity: 702,
          dueDate: '2026-02-02T14:31:55.400Z',
        },
      },
    ],
  },
]
