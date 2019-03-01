package FixMyStreet::Cobrand::Northamptonshire;
use parent 'FixMyStreet::Cobrand::Whitelabel';

use strict;
use warnings;

use Moo;
with 'FixMyStreet::Roles::ConfirmValidation';

sub council_area_id { 2234 }
sub council_area { 'Northamptonshire' }
sub council_name { 'Northamptonshire County Council' }
sub council_url { 'northamptonshire' }

sub example_places { ( 'NN1 1NS', "Bridge Street" ) }

sub base_url {
    my $self = shift;
    return $self->next::method() if FixMyStreet->config('STAGING_SITE');
    return 'https://fixmystreet.northamptonshire.gov.uk';
}

sub disambiguate_location {
    my $self    = shift;
    my $string  = shift;

    return {
        %{ $self->SUPER::disambiguate_location() },
        centre => '52.30769080650276,-0.8647071378799923',
        bounds => [ 51.97726778979222, -1.332346116362747, 52.643600776698605, -0.3416080408721255 ],
    };
}

sub send_questionnaires { 0 }

sub on_map_default_status { 'open' }

sub contact_email {
    my $self = shift;
    return join( '@', 'highways', $self->council_url . '.gov.uk' );
}

sub enable_category_groups { 1 }

sub is_two_tier { 1 }

sub get_geocoder { 'OSM' }

sub map_type { 'OSM' }

1;
