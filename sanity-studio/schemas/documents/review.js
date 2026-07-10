export default {
  name: 'review',
  type: 'document',
  title: 'Review',
  icon: () => '⭐',
  fields: [
    {
      name: 'user',
      type: 'reference',
      title: 'User',
      to: [{type: 'user'}],
      validation: Rule => Rule.required(),
      description: 'The user who wrote this review'
    },
    {
      name: 'tour',
      type: 'reference',
      title: 'Tour',
      to: [{type: 'tour'}],
      validation: Rule => Rule.required(),
      description: 'The tour being reviewed'
    },
    {
      name: 'booking',
      type: 'reference',
      title: 'Booking',
      to: [{type: 'booking'}],
      description: 'The specific booking this review is for (optional)'
    },
    {
      name: 'rating',
      type: 'number',
      title: 'Overall Rating',
      description: 'Overall rating from 1 to 5 stars',
      validation: Rule => Rule.required().min(1).max(5),
      options: {
        list: [
          {title: '1 Star - Poor', value: 1},
          {title: '2 Stars - Fair', value: 2},
          {title: '3 Stars - Good', value: 3},
          {title: '4 Stars - Very Good', value: 4},
          {title: '5 Stars - Excellent', value: 5}
        ]
      }
    },
    {
      name: 'title',
      type: 'string',
      title: 'Review Title',
      validation: Rule => Rule.required().min(5).max(100),
      description: 'A short title summarizing the review'
    },
    {
      name: 'comment',
      type: 'text',
      title: 'Review Comment',
      rows: 4,
      validation: Rule => Rule.required().min(10).max(2000),
      description: 'Detailed review comments from the user'
    },
    {
      name: 'aspectRatings',
      type: 'object',
      title: 'Detailed Aspect Ratings',
      description: 'Breakdown of ratings for different aspects of the tour',
      fields: [
        {
          name: 'tourGuide',
          type: 'number',
          title: 'Tour Guide',
          description: 'Rating for the tour guide (1-5)',
          validation: Rule => Rule.min(1).max(5),
          options: {
            list: [1, 2, 3, 4, 5]
          }
        },
        {
          name: 'accommodation',
          type: 'number',
          title: 'Accommodation',
          description: 'Rating for accommodation quality (1-5)',
          validation: Rule => Rule.min(1).max(5),
          options: {
            list: [1, 2, 3, 4, 5]
          }
        },
        {
          name: 'transportation',
          type: 'number',
          title: 'Transportation',
          description: 'Rating for transportation comfort (1-5)',
          validation: Rule => Rule.min(1).max(5),
          options: {
            list: [1, 2, 3, 4, 5]
          }
        },
        {
          name: 'food',
          type: 'number',
          title: 'Food & Dining',
          description: 'Rating for food quality (1-5)',
          validation: Rule => Rule.min(1).max(5),
          options: {
            list: [1, 2, 3, 4, 5]
          }
        },
        {
          name: 'valueForMoney',
          type: 'number',
          title: 'Value for Money',
          description: 'Rating for overall value (1-5)',
          validation: Rule => Rule.min(1).max(5),
          options: {
            list: [1, 2, 3, 4, 5]
          }
        },
        {
          name: 'activities',
          type: 'number',
          title: 'Activities & Experiences',
          description: 'Rating for activities and experiences (1-5)',
          validation: Rule => Rule.min(1).max(5),
          options: {
            list: [1, 2, 3, 4, 5]
          }
        }
      ]
    },
    {
      name: 'travelDate',
      type: 'date',
      title: 'Travel Date',
      description: 'When did the user take this tour?',
      validation: Rule => Rule.max(new Date().toISOString().split('T')[0])
    },
    {
      name: 'travelGroup',
      type: 'string',
      title: 'Travel Group Type',
      description: 'Who did the user travel with?',
      options: {
        list: [
          {title: 'Solo Traveler', value: 'solo'},
          {title: 'Couple', value: 'couple'},
          {title: 'Family with Children', value: 'family'},
          {title: 'Group of Friends', value: 'friends'},
          {title: 'Business Colleagues', value: 'business'}
        ]
      }
    },
    {
      name: 'tripDuration',
      type: 'string',
      title: 'Trip Duration',
      description: 'How long was the trip?',
      options: {
        list: [
          {title: 'Weekend (2-3 days)', value: 'weekend'},
          {title: 'Short Break (4-7 days)', value: 'short_break'},
          {title: 'Extended (8-14 days)', value: 'extended'},
          {title: 'Long Journey (15+ days)', value: 'long_journey'}
        ]
      }
    },
    {
      name: 'photos',
      type: 'array',
      title: 'Review Photos',
      description: 'Photos uploaded by the user for this review',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
              description: 'Important for SEO and accessibility',
              validation: Rule => Rule.required()
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
              description: 'Optional caption for the photo'
            }
          ]
        }
      ],
      options: {
        layout: 'grid'
      }
    },
    {
      name: 'pros',
      type: 'array',
      title: 'Pros / What I Loved',
      description: 'Positive aspects highlighted by the user',
      of: [{type: 'string'}],
      validation: Rule => Rule.max(10)
    },
    {
      name: 'cons',
      type: 'array',
      title: 'Cons / Areas for Improvement',
      description: 'Negative aspects or suggestions for improvement',
      of: [{type: 'string'}],
      validation: Rule => Rule.max(10)
    },
    {
      name: 'wouldRecommend',
      type: 'boolean',
      title: 'Would Recommend',
      description: 'Would the user recommend this tour to others?',
      initialValue: true
    },
    {
      name: 'verification',
      type: 'object',
      title: 'Verification Details',
      fields: [
        {
          name: 'isVerified',
          type: 'boolean',
          title: 'Verified Purchase',
          description: 'Review from a verified booking',
          initialValue: false
        },
        {
          name: 'verificationMethod',
          type: 'string',
          title: 'Verification Method',
          options: {
            list: [
              {title: 'Booking Confirmation', value: 'booking'},
              {title: 'Email Verification', value: 'email'},
              {title: 'Manual Verification', value: 'manual'}
            ]
          }
        },
        {
          name: 'verifiedAt',
          type: 'datetime',
          title: 'Verified At'
        }
      ]
    },
    {
      name: 'status',
      type: 'string',
      title: 'Review Status',
      options: {
        list: [
          {title: 'Pending Review', value: 'pending'},
          {title: 'Approved', value: 'approved'},
          {title: 'Rejected', value: 'rejected'},
          {title: 'Flagged', value: 'flagged'}
        ]
      },
      initialValue: 'pending',
      validation: Rule => Rule.required()
    },
    {
      name: 'featured',
      type: 'object',
      title: 'Featured Settings',
      fields: [
        {
          name: 'isFeatured',
          type: 'boolean',
          title: 'Featured Review',
          description: 'Show this review in featured sections',
          initialValue: false
        },
        {
          name: 'featuredUntil',
          type: 'datetime',
          title: 'Featured Until',
          description: 'How long should this review be featured?'
        },
        {
          name: 'featuredPosition',
          type: 'number',
          title: 'Featured Position',
          description: 'Order in which featured reviews appear (lower numbers first)',
          initialValue: 0
        }
      ]
    },
    {
      name: 'engagement',
      type: 'object',
      title: 'User Engagement',
      fields: [
        {
          name: 'helpfulVotes',
          type: 'number',
          title: 'Helpful Votes',
          description: 'Number of users who found this review helpful',
          initialValue: 0
        },
        {
          name: 'notHelpfulVotes',
          type: 'number',
          title: 'Not Helpful Votes',
          description: 'Number of users who did not find this review helpful',
          initialValue: 0
        },
        {
          name: 'reportCount',
          type: 'number',
          title: 'Report Count',
          description: 'Number of times this review has been reported',
          initialValue: 0
        },
        {
          name: 'shareCount',
          type: 'number',
          title: 'Share Count',
          description: 'Number of times this review has been shared',
          initialValue: 0
        }
      ]
    },
    {
      name: 'response',
      type: 'object',
      title: 'Business Response',
      description: 'Official response from Jwazzy Travel',
      fields: [
        {
          name: 'comment',
          type: 'text',
          title: 'Response Comment',
          rows: 3,
          description: 'Official response to the review'
        },
        {
          name: 'respondedBy',
          type: 'reference',
          title: 'Responded By',
          to: [{type: 'user'}],
          description: 'Staff member who responded'
        },
        {
          name: 'respondedAt',
          type: 'datetime',
          title: 'Responded At',
          initialValue: () => new Date().toISOString()
        },
        {
          name: 'isPublic',
          type: 'boolean',
          title: 'Public Response',
          description: 'Show this response to the public',
          initialValue: true
        }
      ]
    },
    {
      name: 'moderation',
      type: 'object',
      title: 'Moderation Details',
      fields: [
        {
          name: 'moderatedBy',
          type: 'reference',
          title: 'Moderated By',
          to: [{type: 'user'}]
        },
        {
          name: 'moderatedAt',
          type: 'datetime',
          title: 'Moderated At'
        },
        {
          name: 'moderationNotes',
          type: 'text',
          title: 'Moderation Notes',
          rows: 3,
          description: 'Internal notes about moderation decisions'
        },
        {
          name: 'rejectionReason',
          type: 'string',
          title: 'Rejection Reason',
          description: 'If rejected, why was this review rejected?',
          options: {
            list: [
              {title: 'Inappropriate Content', value: 'inappropriate'},
              {title: 'Fake Review', value: 'fake'},
              {title: 'Conflict of Interest', value: 'conflict'},
              {title: 'Off-topic', value: 'off_topic'},
              {title: 'Spam', value: 'spam'},
              {title: 'Other', value: 'other'}
            ]
          }
        }
      ]
    },
    {
      name: 'language',
      type: 'string',
      title: 'Review Language',
      description: 'Language the review was written in',
      options: {
        list: [
          {title: 'English', value: 'en'},
          {title: 'Arabic', value: 'ar'}
        ]
      },
      initialValue: 'en'
    },
    {
      name: 'helpfulTags',
      type: 'array',
      title: 'Helpful Tags',
      description: 'Tags that describe why this review is helpful',
      of: [{type: 'string'}],
      options: {
        list: [
          {title: 'Detailed', value: 'detailed'},
          {title: 'Helpful Photos', value: 'photos'},
          {title: 'Recent Experience', value: 'recent'},
          {title: 'Balanced Review', value: 'balanced'},
          {title: 'Specific Tips', value: 'tips'},
          {title: 'Verified Traveler', value: 'verified'}
        ]
      }
    },
    {
      name: 'createdAt',
      type: 'datetime',
      title: 'Created At',
      initialValue: () => new Date().toISOString(),
      readOnly: true
    },
    {
      name: 'updatedAt',
      type: 'datetime',
      title: 'Updated At',
      initialValue: () => new Date().toISOString()
    },
    {
      name: 'publishedAt',
      type: 'datetime',
      title: 'Published At',
      description: 'When the review was made public'
    }
  ],
  preview: {
    select: {
      title: 'user.name',
      tour: 'tour.name',
      rating: 'rating',
      status: 'status',
      featured: 'featured.isFeatured'
    },
    prepare({title, tour, rating, status, featured}) {
      const stars = '⭐'.repeat(rating)
      const statusEmoji = {
        'pending': '⏳',
        'approved': '✅',
        'rejected': '❌',
        'flagged': '🚩'
      }[status] || ''

      return {
        title: `${title} - ${stars}`,
        subtitle: `${tour} ${featured ? '🌟' : ''} ${statusEmoji}`,
        media: () => '⭐'
      }
    }
  },
  orderings: [
    {
      title: 'Newest First',
      name: 'createdAtDesc',
      by: [{field: 'createdAt', direction: 'desc'}]
    },
    {
      title: 'Highest Rating',
      name: 'ratingDesc',
      by: [{field: 'rating', direction: 'desc'}]
    },
    {
      title: 'Most Helpful',
      name: 'helpfulDesc',
      by: [{field: 'engagement.helpfulVotes', direction: 'desc'}]
    },
    {
      title: 'Featured First',
      name: 'featuredDesc',
      by: [
        {field: 'featured.isFeatured', direction: 'desc'},
        {field: 'featured.featuredPosition', direction: 'asc'}
      ]
    }
  ],
  initialValue: {
    status: 'pending'
  }
}