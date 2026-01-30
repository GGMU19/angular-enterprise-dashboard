import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { FormConfig } from '../models/form-config.model';

/**
 * Mock Form Configuration Service
 *
 * Provides sample form configurations for testing and demonstration.
 * In production, this would fetch form configs from an API.
 */
@Injectable({
  providedIn: 'root'
})
export class MockFormConfigService {
  /**
   * Get sample user registration form configuration
   */
  getUserRegistrationForm(): Observable<FormConfig> {
    const config: FormConfig = {
      id: 'user-registration',
      name: 'User Registration',
      title: 'Create Your Account',
      description:
        'Fill out the form below to create your account. All fields marked with * are required.',
      layout: 'vertical',
      showProgressBar: true,
      allowSaveProgress: true,
      submitButtonText: 'Register',
      cancelButtonText: 'Cancel',
      sections: [
        {
          title: 'Personal Information',
          description: 'Tell us about yourself',
          order: 1,
          fields: [
            {
              name: 'firstName',
              label: 'First Name',
              type: 'text',
              required: true,
              placeholder: 'Enter your first name',
              validators: [
                { type: 'required', message: 'First name is required' },
                { type: 'minLength', value: 2, message: 'First name must be at least 2 characters' }
              ],
              cols: 6,
              order: 1
            },
            {
              name: 'lastName',
              label: 'Last Name',
              type: 'text',
              required: true,
              placeholder: 'Enter your last name',
              validators: [
                { type: 'required', message: 'Last name is required' },
                { type: 'minLength', value: 2, message: 'Last name must be at least 2 characters' }
              ],
              cols: 6,
              order: 2
            },
            {
              name: 'email',
              label: 'Email Address',
              type: 'email',
              required: true,
              placeholder: 'you@example.com',
              hint: "We'll never share your email",
              validators: [
                { type: 'required', message: 'Email is required' },
                { type: 'email', message: 'Please enter a valid email address' }
              ],
              cols: 12,
              order: 3
            },
            {
              name: 'dateOfBirth',
              label: 'Date of Birth',
              type: 'date',
              required: true,
              hint: 'You must be at least 18 years old',
              cols: 6,
              order: 4
            },
            {
              name: 'country',
              label: 'Country',
              type: 'select',
              required: true,
              options: [
                { label: 'United States', value: 'US' },
                { label: 'Canada', value: 'CA' },
                { label: 'United Kingdom', value: 'UK' },
                { label: 'Australia', value: 'AU' },
                { label: 'Germany', value: 'DE' },
                { label: 'France', value: 'FR' }
              ],
              cols: 6,
              order: 5
            }
          ]
        },
        {
          title: 'Account Security',
          description: 'Choose a secure password',
          order: 2,
          fields: [
            {
              name: 'password',
              label: 'Password',
              type: 'password',
              required: true,
              hint: 'At least 8 characters with letters and numbers',
              validators: [
                { type: 'required', message: 'Password is required' },
                { type: 'minLength', value: 8, message: 'Password must be at least 8 characters' },
                {
                  type: 'pattern',
                  value: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$',
                  message: 'Password must contain uppercase, lowercase, and number'
                }
              ],
              cols: 6,
              order: 1
            },
            {
              name: 'confirmPassword',
              label: 'Confirm Password',
              type: 'password',
              required: true,
              validators: [{ type: 'required', message: 'Please confirm your password' }],
              cols: 6,
              order: 2
            }
          ]
        },
        {
          title: 'Preferences',
          description: 'Customize your experience',
          collapsible: true,
          collapsed: false,
          order: 3,
          fields: [
            {
              name: 'interests',
              label: 'Interests',
              type: 'checkbox-group',
              hint: 'Select all that apply',
              options: [
                { label: 'Technology', value: 'tech' },
                { label: 'Sports', value: 'sports' },
                { label: 'Music', value: 'music' },
                { label: 'Arts', value: 'arts' },
                { label: 'Travel', value: 'travel' }
              ],
              cols: 12,
              order: 1
            },
            {
              name: 'newsletter',
              label: 'Subscribe to our newsletter',
              type: 'toggle',
              value: true,
              hint: 'Get weekly updates and special offers',
              cols: 12,
              order: 2
            },
            {
              name: 'bio',
              label: 'Tell us about yourself',
              type: 'textarea',
              placeholder: 'Share a bit about yourself...',
              rows: 4,
              validators: [
                { type: 'maxLength', value: 500, message: 'Bio must be less than 500 characters' }
              ],
              cols: 12,
              order: 3
            }
          ]
        },
        {
          title: 'Terms & Conditions',
          order: 4,
          fields: [
            {
              name: 'agreeToTerms',
              label: 'I agree to the Terms and Conditions',
              type: 'checkbox',
              required: true,
              validators: [{ type: 'required', message: 'You must agree to the terms' }],
              cols: 12,
              order: 1
            },
            {
              name: 'agreeToPrivacy',
              label: 'I agree to the Privacy Policy',
              type: 'checkbox',
              required: true,
              validators: [{ type: 'required', message: 'You must agree to the privacy policy' }],
              cols: 12,
              order: 2
            }
          ]
        }
      ]
    };

    return of(config).pipe(delay(500)); // Simulate API delay
  }

  /**
   * Get sample project creation form configuration
   */
  getProjectCreationForm(): Observable<FormConfig> {
    const config: FormConfig = {
      id: 'project-creation',
      name: 'Project Creation',
      title: 'Create New Project',
      description: 'Set up your project with the following information',
      layout: 'grid',
      showProgressBar: true,
      submitButtonText: 'Create Project',
      cancelButtonText: 'Cancel',
      sections: [
        {
          title: 'Basic Information',
          order: 1,
          fields: [
            {
              name: 'projectName',
              label: 'Project Name',
              type: 'text',
              required: true,
              placeholder: 'My Awesome Project',
              cols: 8,
              order: 1
            },
            {
              name: 'projectCode',
              label: 'Project Code',
              type: 'text',
              required: true,
              placeholder: 'PROJ-001',
              hint: 'Unique identifier for this project',
              cols: 4,
              order: 2
            },
            {
              name: 'description',
              label: 'Description',
              type: 'textarea',
              required: true,
              placeholder: 'Describe your project...',
              rows: 3,
              cols: 12,
              order: 3
            },
            {
              name: 'category',
              label: 'Category',
              type: 'select',
              required: true,
              options: [
                { label: 'Web Development', value: 'web' },
                { label: 'Mobile App', value: 'mobile' },
                { label: 'Data Science', value: 'data' },
                { label: 'DevOps', value: 'devops' },
                { label: 'Design', value: 'design' }
              ],
              cols: 6,
              order: 4
            },
            {
              name: 'priority',
              label: 'Priority',
              type: 'radio',
              required: true,
              value: 'medium',
              options: [
                { label: 'Low', value: 'low' },
                { label: 'Medium', value: 'medium' },
                { label: 'High', value: 'high' },
                { label: 'Critical', value: 'critical' }
              ],
              cols: 6,
              order: 5
            }
          ]
        },
        {
          title: 'Timeline & Budget',
          order: 2,
          fields: [
            {
              name: 'startDate',
              label: 'Start Date',
              type: 'date',
              required: true,
              cols: 6,
              order: 1
            },
            {
              name: 'endDate',
              label: 'End Date',
              type: 'date',
              required: true,
              cols: 6,
              order: 2
            },
            {
              name: 'budget',
              label: 'Budget ($)',
              type: 'number',
              required: true,
              min: 0,
              step: 1000,
              placeholder: '50000',
              cols: 6,
              order: 3
            },
            {
              name: 'teamSize',
              label: 'Team Size',
              type: 'number',
              required: true,
              min: 1,
              max: 100,
              value: 5,
              cols: 6,
              order: 4
            }
          ]
        }
      ]
    };

    return of(config).pipe(delay(500));
  }

  /**
   * Submit form data (mock API call)
   */
  submitForm(
    formId: string,
    data: Record<string, unknown>
  ): Observable<{ success: boolean; message: string }> {
    console.log('Form submission:', { formId, data });

    return of({
      success: true,
      message: 'Form submitted successfully!'
    }).pipe(delay(1000));
  }
}
